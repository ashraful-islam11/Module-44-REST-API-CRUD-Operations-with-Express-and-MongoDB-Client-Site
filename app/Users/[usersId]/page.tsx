
interface IPramsType {
    params: Promise<{usersId:string}>
}


const UsersDetailsPage =  async ({params} : IPramsType) => {
    const {usersId} = await params ;
    console.log('এই params হালারপুত কি দিতছে', usersId);
   
     const res = await fetch(`http://localhost:5000/users/${usersId}`);
     const userDetails = await res.json();
     console.log( 'user details is here ', userDetails) ;
    return (
        <div>
            <h1>users details id :  {userDetails._id} </h1>

            <div>
                <h2>Name : {userDetails.name}</h2>
                <h2>Email : {userDetails.email}</h2>
                <h2>Id : {userDetails._id}</h2>
            </div>
            
        </div>
    );
};

export default UsersDetailsPage;