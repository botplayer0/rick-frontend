import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Project: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        onClick={() =>
          navigate(`/config/project/${Math.floor(Math.random() * (1000 + 1))}`)
        }
      >
        进入项目详情
      </Button>
    </div>
  );
};

export default Project;
