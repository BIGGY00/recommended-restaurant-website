import { useState } from "react";
import { FilterForm } from "@/components/FilterForm";
import { ResultsTable } from "@/components/ResultsTable";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

const ITEMS_PER_PAGE = 10;

const Index = () => {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (filters: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://recommended-restaurant-1-0.onrender.com/api/restaurants/filter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filters),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch restaurants");
      }

      const data = await response.json();
      setResults(data);
      setCurrentPage(1);
      toast({
        title: "Success",
        description: `Found ${data.length} restaurants matching your criteria.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch restaurants. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const paginatedResults = results.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Restaurant Finder
        </h1>
        <div className="grid gap-8">
          <FilterForm onSubmit={handleSubmit} />
          {isLoading ? (
            <Card className="p-8">
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            </Card>
          ) : results.length > 0 ? (
            <ResultsTable
              data={paginatedResults}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={Math.ceil(results.length / ITEMS_PER_PAGE)}
            />
          ) : (
            <Card className="p-8 text-center text-gray-500">
              Use the filters above to find restaurants
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;