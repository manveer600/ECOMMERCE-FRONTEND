import Navbar from '../features/navbar/Navbar.js'
import UserProfile from '../features/user/components/userProfile';
function UserProfilePage() {
    return ( 
        <Navbar>
            <UserProfile></UserProfile>
        </Navbar>
     );
}

export default UserProfilePage;