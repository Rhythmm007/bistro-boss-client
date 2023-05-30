import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
  const { user } = useContext(AuthContext);
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email], // Add null check for user.email
    queryFn: async () => {
      if (!user) return []; // Return an empty array if user is null
      const res = await fetch(`http://localhost:5000/carts?email=${user.email}`);
      return res.json();
    },
  });
  return [cart, refetch];
};
export default useCart