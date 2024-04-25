import Navbar from "../features/navbar/Navbar";
import UserOrder from "../features/user/components/userOrder";

function UserOrderPage() {
    return ( 
        <div>
            <Navbar>
                <UserOrder/>
            </Navbar>
        </div>
     );
}

export default UserOrderPage;