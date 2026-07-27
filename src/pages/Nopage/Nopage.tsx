import "./Nopage.css";
import { Link } from "react-router-dom";
import { Button, Result } from "antd";

const Nopage = () => {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, See you are on a broken page"
        extra={
          <Button type="primary">
            <Link to="/">Go to Home</Link>
          </Button>
        }
      />
    </div>
  );
};

export default Nopage;
