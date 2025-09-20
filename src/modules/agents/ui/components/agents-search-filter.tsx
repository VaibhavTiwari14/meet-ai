import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useAgentFilters } from "../../hooks/use-agents-filters";

const AgentSearchFilter = () => {
  const [filters, setFilters] = useAgentFilters();

  return (
    <div className="relative">
      <Input
        placeholder="Filter by name"
        className="h-9 bg-white w-[200px] pl-7"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
      <SearchIcon className="size-4 absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
};

export default AgentSearchFilter;
