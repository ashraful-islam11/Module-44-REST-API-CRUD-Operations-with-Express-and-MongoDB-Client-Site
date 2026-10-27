import UsersInformation from "../../components/UsersInformation";
import IUserType from "../IType";

 
const UsersInfoPage = async() => {
    const request = await fetch(`http://localhost:5000/users`) ;
    const users : IUserType[]   = await request.json() ;
    console.log(users);
    
    return (
        <div>
              <h2> total users {users.length} </h2>  
              <div className=" grid grid-cols-3 gap-4 ">
                {
                    users.map(user => <UsersInformation key={user._id} user ={user} />)
                }
              </div>

        </div>
    );
};

export default UsersInfoPage;