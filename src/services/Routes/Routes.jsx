import { Routes, Route } from "react-router-dom"
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute"
import { SignUp } from "../../pages/SignUp/SignUp"
import { Main } from "../../pages/Main/Main"
import { NotFound } from "../../pages/NotFound/NotFound"
import { ProductsByOrder } from "../../pages/ProductsByOrder/ProductsByOrder"

export const AppRoutes = ({ user, login, setLogin, password, setPassword }) => {

    return (
        <Routes>
            <Route path="/login" element={<SignUp user={user} login={login} setLogin={setLogin} password={password} setPassword={setPassword} />} />
            <Route element={<ProtectedRoute isAllowed={Boolean(user)} />} >
                <Route path="/" element={<Main />} />
                <Route path="/products/:id" element={<ProductsByOrder />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}