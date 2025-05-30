import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./footer";

function ShoppingView() {
    return (
        <div>
            <ShoppingHeader/>
            <main>
                <h1>Shopping View</h1>
            </main>
            <ShoppingFooter/>
            <Outlet/>
        </div>
    )
}

export default ShoppingView;