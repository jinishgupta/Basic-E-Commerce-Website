import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingView() {
    return (
        <div>
            <ShoppingHeader/>
            <Outlet/>
        </div>
    )
}

export default ShoppingView;