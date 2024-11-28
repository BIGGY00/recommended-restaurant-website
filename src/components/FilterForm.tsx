import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const runnerTypes = ["Fun Run", "Mini Marathon", "Half Marathon", "Marathon"];
const budgetRanges = [
  { min: null, max: null, label: "Any Budget" },
  { min: 0, max: 300, label: "0 - 300 Baht" },
  { min: 301, max: 600, label: "301 - 600 Baht" },
  { min: 601, max: 900, label: "601 - 900 Baht" },
  { min: 901, max: 1200, label: "901 - 1200 Baht" },
  { min: 1201, max: 1500, label: "1201 - 1500 Baht" },
  { min: 1501, max: 1800, label: "1501 - 1800 Baht" },
  { min: 1801, max: 2100, label: "1801 - 2100 Baht" },
  { min: 2101, max: 999999, label: "More than 2100 Baht" },
];
const restaurantTypes = [
  "Any Type",
  "Kiosk_Type",
  "Fast_Dining_Type",
  "Casual_Dining_Type",
  "Fine_Dining_Type",
];

const foodTypes = [
  "ALaCarte_Type",
  "Bakery_Cake_Type",
  "Breakfast_Type",
  "BubbleMilkTea_Type",
  "Buffet_Type",
  "CleanFood_Salad_Type",
  "Dessert_Type",
  "FastFood_Type",
  "Fusion_Type",
  "Grill_Type",
  "Halal_Type",
  "Healthy_Type",
  "HotPot_Type",
  "International_Type",
  "Japanese_Type",
  "Korean_Type",
  "Local_Type",
  "Noodle_Type",
  "Rice_Type",
  "Seafood_Type",
  "Shabu_Type",
  "Steak_Type",
  "Street_Type",
  "Thai_Type",
  "Vegetarian_Type",
];

interface FilterFormProps {
  onSubmit: (filters: any) => void;
}

export const FilterForm = ({ onSubmit }: FilterFormProps) => {
  const [runnerType, setRunnerType] = useState("");
  const [budget, setBudget] = useState("");
  const [restaurantType, setRestaurantType] = useState("");
  const [selectedFoodTypes, setSelectedFoodTypes] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedBudget = budgetRanges.find(
      (range) => range.label === budget
    ) || { min: null, max: null };

    // Send the selected filters, sending null for 'Any' or unselected options
    onSubmit({
      runnerType: runnerType === "Any" ? null : runnerType,
      budgetMin: selectedBudget.min,
      budgetMax: selectedBudget.max,
      restaurantType: restaurantType === "Any Type" ? null : restaurantType,
      foodTypes: selectedFoodTypes.length > 0 ? selectedFoodTypes : null, // Send null if no food types are selected
    });
  };

  const handleClearFoodTypes = () => {
    setSelectedFoodTypes([]); // Clears the selection
  };

  return (
    <Card className="p-6 bg-white shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Runner Type Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Runner Type</label>
            <Select onValueChange={setRunnerType}>
              <SelectTrigger>
                <SelectValue placeholder="Select runner type" />
              </SelectTrigger>
              <SelectContent>
                {runnerTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Budget Range Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Budget Range</label>
            <Select onValueChange={setBudget}>
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map((range) => (
                  <SelectItem key={range.label} value={range.label}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Restaurant Type Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Restaurant Type
            </label>
            <Select onValueChange={setRestaurantType}>
              <SelectTrigger>
                <SelectValue placeholder="Select restaurant type" />
              </SelectTrigger>
              <SelectContent>
                {restaurantTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Food Types Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Food Types</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {foodTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={selectedFoodTypes.includes(type)}
                    onCheckedChange={(checked) => {
                      setSelectedFoodTypes(
                        checked
                          ? [...selectedFoodTypes, type]
                          : selectedFoodTypes.filter((t) => t !== type)
                      );
                    }}
                  />
                  <label
                    htmlFor={type}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type.replace(/_/g, " ")}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Search Restaurants
        </Button>
      </form>
    </Card>
  );
};