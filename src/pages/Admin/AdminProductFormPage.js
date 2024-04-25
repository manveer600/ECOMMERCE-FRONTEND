import Navbar from "../../features/navbar/Navbar.js";
import AdminProductForm from '../../features/admin/components/AdminProductForm.js'
function AdminProductFormPage() {
    return (
        <div>
            <Navbar>
                <AdminProductForm />
            </Navbar>

        </div>
    );
}

export default AdminProductFormPage;