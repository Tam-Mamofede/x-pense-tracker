import React, { useEffect, useRef } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useExpense } from "../Contexts/ExpenseContext";
import { useBudget } from "../Contexts/BudgetContext";
import Budget from "../components/Budget";
import Expense from "../components/Expense";
import BudgetChart from "../components/BudgetGraph";
import Navigation from "../components/Navigation";
import CreateBudget from "../components/CreateBudget";
import Loader from "../components/Loader";

function Dashboard() {
  const { selectedMonth, isLoading, darkmode } = useAuth();

  const {
    categories,
    popupOpen,
    setPopupOpen,
    handleChangeMonth,
    totalBudget,
  } = useBudget();

  const { showExpense, expenseRef, handleShowExpense, totalExpense } =
    useExpense();

  const budgetRef = useRef(null);
  const buttonStyles =
    "w-fit rounded-xl bg-[#e3f0af] px-4 py-2 text-center font-semibold text-[#1f4529] shadow-md";

  const handleShowPopup = () => {
    setPopupOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (popupOpen && budgetRef.current) {
      budgetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [popupOpen]);

  return (
    <div
      className={`scrollable-container relative flex flex-col overflow-hidden pb-8 ${darkmode ? "bg-[#122717]" : "bg-[#fffcf9]"}`}
    >
      {isLoading ? <Loader /> : null}
      <Navigation />

      <div className="flex flex-col items-center">
        {selectedMonth ? (
          <>
            <BudgetChart />
            <Budget />
            <div
              className={`flex flex-col justify-center space-y-2 pt-4 text-center text-[12px] lg:text-[14px] ${darkmode ? "text-[#e3f0af]" : "text-[#122717]"}`}
            >
              <p>
                Total budget for {selectedMonth} is {totalBudget}
              </p>
              <p>
                You have spent a total of {totalExpense} this {selectedMonth}
              </p>
            </div>

            <div className="mt-6 flex flex-col items-center space-y-4">
              {categories.length <= 0 ? (
                <button onClick={handleShowPopup} className={buttonStyles}>
                  Create a budget
                </button>
              ) : (
                // <NavLink to="/create-budget">
                //   <button className={buttonStyles}>Create a budget</button>
                // </NavLink>
                <button onClick={handleShowPopup} className={buttonStyles}>
                  {popupOpen === false ? "Add budget" : "Cancel"}
                </button>
              )}
              <button onClick={handleChangeMonth} className={buttonStyles}>
                Change month
              </button>
              <button onClick={handleShowExpense} className={buttonStyles}>
                {showExpense === true ? "Cancel" : "Add expense"}
              </button>
            </div>
            <div>{popupOpen && <CreateBudget ref={budgetRef} />}</div>
          </>
        ) : (
          <div className="flex h-screen w-4/5 flex-col items-center justify-center space-y-6 p-4">
            <p className="font-extrabold">Start you budgeting journey.</p>
            <div className="flex flex-col items-center space-y-4">
              <button onClick={handleChangeMonth} className={buttonStyles}>
                Type in a month
              </button>
            </div>
          </div>
        )}
        <>{showExpense && <Expense ref={expenseRef} />}</>
      </div>
    </div>
  );
}
export default Dashboard;
