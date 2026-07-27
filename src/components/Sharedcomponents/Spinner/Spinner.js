import "./Spinner.css";

const Spinner = () => {
  return (
    <div>
      <br />
      <img
        alt="loader"
        src={process.env.PUBLIC_URL + "images/loading.gif"}
        className="w3-round loader"
      />
      Loading Data Please Wait...
    </div>
  );
};

export default Spinner;
