import { useParams } from "react-router-dom";

const ProjectDetail = () => {
  const params = useParams();

  return <div>{params.projectId}</div>;
};

export default ProjectDetail;
