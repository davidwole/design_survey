import BudgetSelector from "../components/BudgetSelector";
import "../styles/GalleryPage.css";
import "../styles/SelectPackage.css";
import "../styles/Budget.css";

export default function Budget() {
  const budgets = [
    "Above $15,000",
    "$10,000 - $15,000",
    "$7,500 - $10,000",
    "$5,000 - $7,500",
    "$3,000 - $5,000",
    "Below $3,000",
  ];
  return (
    <>
      <div className="budget_container">
        <div className="gallery_text">
          <div className="text_content">
            <p className="package_description uppercase">
              What's your approximate budget range for each room?
            </p>
          </div>
        </div>

        <div className="budget_option_section">
          {budgets.map((budget, index) => (
            <BudgetSelector key={index} budget={budget} />
          ))}
        </div>
      </div>
    </>
  );
}
