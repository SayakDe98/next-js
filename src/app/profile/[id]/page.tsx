'use client'
import axios from "axios";
import { useRouter } from "next/navigation";

const UserProfile = ({ params }: { params: { id: string } }) => {
    const router = useRouter() ;   
    const logoutHandler = async () => {
          try {
            const { data } = await axios.post("/api/users/logout");
            console.log(data);
            router.push("/login");
          } catch (error: any) {
            console.log(error.message);
          }
        };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl mt-5 flex flex-col text-center">
        Profile Page{" "}
        <span className="mt-5 p-2 rounded bg-violet-500 text-black">
          {params.id}
        </span>
      </p>
      <button
        className="bg-violet-500 mt-4 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
