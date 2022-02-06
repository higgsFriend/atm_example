const ATMDeposit = ({ onChange, isDeposit, validTransaction }) => {
  const choice = ['Deposit', 'Cash Back'];
  var isValid = validTransaction;
  console.log(`Valid?: ${isValid}`);
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={isValid ? false : true}></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [msg, setMsg] = React.useState('Welcome to Johnny\'s ATM.  Please select your activity.' );

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));
    if(Number(event.target.value) <= 0) {
      setValidTransaction(false)
      console.log(`Crap transaction.`);
      return;
    }else if(atmMode === "Cash Back" && Number(event.target.value) > totalState) {
      console.log(`Crap transaction.`);
      setValidTransaction(false);
      setMsg("Sorry mate, you don't have enough cash for that.");
    }else{
      console.log(`Gooden transaction.`);
      setValidTransaction(true);
      setMsg(`Please enter the amount you would like to ${isDeposit ? "Deposit" : "Withdraw"}.`);
    }
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
    setMsg("Nice!  Thanks for the cash.");
  };
  const handleModeSelect = (event) => {
    console.log(`handleModeSelect ${event.target.value}`);
    setAtmMode(event.target.value);
    console.log(`Atm mode is: ${event.target.value}`);
    event.target.value === "Deposit" ? setIsDeposit(true) : setIsDeposit(false);
    event.preventDefault();
    if(event.target.value === "Deposit") {
      setMsg("Please enter the amount of cash you would like to deposit.");
    } else {
      setMsg("Please enter the amount you would like to withdraw.");
    }
  };
  return (
  <div>
  <div className="main">
  <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      {/* <label>Please select what you would like to do at Johnny's: </label> */}
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
      <option id="no-selection" value=""></option>
      <option id="deposit-selection" value="Deposit">Deposit</option>
      <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      {atmMode != "" && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} validTransaction={validTransaction}></ATMDeposit>}
    </form>
    </div>
    <h2>{msg}</h2>
    </div>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
