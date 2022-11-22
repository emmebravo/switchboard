import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import TableInstance from "./TableInstance";

const fetchData = () => axios.get("http://localhost:2500/api/donorInfo");

const TableQuery = () => {
  const { data, isLoading, isError } = useQuery(["donors"], fetchData);

  const [donorData, setDonorData] = useState(null);

  useEffect(() => {
    setDonorData(data?.data?.donorInfo);
  }, [data]);

  if (isError) {
    return <div>Sorry, there's been an error...</div>;
  }

  if (isLoading || !donorData) {
    return <div>Loading...</div>;
  }

  return <TableInstance donorData={donorData} />;
};

export default TableQuery;
