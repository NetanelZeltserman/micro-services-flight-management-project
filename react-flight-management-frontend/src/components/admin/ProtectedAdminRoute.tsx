import {Navigate, useLocation} from "react-router-dom"
import { ApplicationStore } from "../../state";
import { useStoreState } from "easy-peasy";

export default function ProtectedAdminRoute({children}: any) {
    const userData = useStoreState((state: ApplicationStore) => state!.user!.data);
    let location   = useLocation();

    if (userData && !userData.isAdmin) {
        return <Navigate to="/"      state={{ from: location}} replace />
    }
    else if (!userData) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }

    return children
};
