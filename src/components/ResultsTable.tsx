import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Restaurant {
  restaurantName: string;
  district: string;
  restaurantNationality: string;
  restaurantType: string;
  foodType: string;
  cleanBudget: number;
}

interface ResultsTableProps {
  data: Restaurant[];
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

export const ResultsTable = ({
  data,
  currentPage,
  onPageChange,
  totalPages,
}: ResultsTableProps) => {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Restaurant Name</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Nationality</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Food Type</TableHead>
              <TableHead>Budget (฿)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((restaurant, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {restaurant.restaurantName}
                </TableCell>
                <TableCell>{restaurant.district}</TableCell>
                <TableCell>{restaurant.restaurantNationality}</TableCell>
                <TableCell>{restaurant.restaurantType}</TableCell>
                <TableCell>{restaurant.foodType}</TableCell>
                <TableCell>{restaurant.cleanBudget}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(currentPage - 1)}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(currentPage + 1)}
              className={
                currentPage === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};