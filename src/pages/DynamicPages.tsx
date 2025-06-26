import { useParams } from "react-router-dom";

const DynamicPage = () => {
  const { slug } = useParams();
  


  const pageTitle = slug || "Page";
 //Dynaimic content for sideNav Route
  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-2xl text-white">This is {pageTitle} Page</h1> 
    </div>
  );
};

export default DynamicPage;