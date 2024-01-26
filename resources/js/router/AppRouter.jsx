import { Route, Routes } from "react-router-dom"
import { Home } from "../components/Home"
import Login from "../components/Login"
import Dashboard from "../components/Dashboard"
import RegisterForm from "../components/RegisterForm"
import { PrivateRoute } from "./PrivateRoute"
import Report from "../components/Report"

export const AppRouter = () => {
    return (
        <>
            {/* <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/*" element={
                    <PrivateRoute>
                        <Route path="dashboard" element={<Dashboard />}></Route>
                        <Route path="register" element={<RegisterForm />}></Route>
                    </PrivateRoute>
                }>

                </Route>

            </Routes> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                <Route path="/*" element={
                    <Routes> 
                        <Route element={<PrivateRoute />}> 
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="register" element={<RegisterForm />} />
                            <Route path="reports" element={<Report/>}></Route>
                        </Route>
                    </Routes>
                } />
            </Routes>

        </>
    )
}