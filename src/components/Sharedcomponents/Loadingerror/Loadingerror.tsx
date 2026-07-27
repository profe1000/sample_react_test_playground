import "./Loadingerror.css";

const Loadingerror = (props: any) => {
  return (
    <div>
      <div className="w3-padding w3-round w3-white">
        <br /> <br /> {props.errormessage} <br />
        <br /> <br />
        <button
          className="w3-btn w3-yellow w3-round w3-text-blue resetbtn"
          onClick={props.reLoadData}
        >
          ReLoad
        </button>
        &nbsp;
        <br />
        <br />
      </div>
    </div>
  );
};

export default Loadingerror;
