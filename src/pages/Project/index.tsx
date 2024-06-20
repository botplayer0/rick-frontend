import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";

const Project: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <Button
        onClick={() =>
          navigate(`/config/project/${Math.floor(Math.random() * (1000 + 1))}`)
        }
      >
        进入项目详情
      </Button>
    </Card>
  );
};

export default Project;
