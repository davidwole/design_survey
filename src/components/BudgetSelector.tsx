import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import "../styles/BudgetSelector.css";

type BudgetSelectorProps = {
  budget: string;
};

export default function BudgetSelector({ budget }: BudgetSelectorProps) {
  const navigate = useNavigate();
  const { setBudget } = useAppContext();

  const handleBudgetSelection = () => {
    setBudget(budget);
    navigate("/home-zip");
  };

  return (
    <div className="budget_selector_container">
      <button className="budget_selector" onClick={handleBudgetSelection}>
        {budget}
      </button>
    </div>
  );
}
