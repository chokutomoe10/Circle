import { Routes, Route, useNavigate, Outlet, Navigate} from "react-router-dom"
import Home from "./pages/Home"
import Detail from "./pages/Detail"
import Follow from "./pages/Follow"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import { useEffect, useState } from "react";
import { API, setAuthToken } from "./lib/api"
import { useDispatch } from "react-redux"
import { AUTH_CHECK, AUTH_ERROR } from "./stores/rootReducer"
import { useSelector } from "react-redux"
import { RootState } from "./stores/types/rootState"

export default function App() {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const auth = useSelector((state : RootState) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function authCheck(){
        try {
            setAuthToken(localStorage.token)
            const response = await API.get('/auth/check')
            dispatch(AUTH_CHECK(response.data.user))
            console.log("respons auth", response)
            setIsLoading(false)
        } catch (error) {
            dispatch(AUTH_ERROR())
            // localStorage.removeItem("token")
            setIsLoading(false)
            navigate("/login")
            console.log("auth error", error)
        }
    }

    useEffect(() => {
        if (localStorage.token) {
            authCheck()
        } else {
            setIsLoading(false)
        }
    }, [])

    function IsLogin() {
        if (!auth.username) {
          return <Navigate to={"/"} />;
        } else {
          return <Outlet />;
        }
      }
    
      function IsNotLogin() {
        if (auth.username) {
          return <Navigate to={"/home"} />;
        } else {
          return <Outlet />;
        }
      }

    return (
    <>
        {isLoading ? null : 
            <Routes>
                <Route path="*" element={<h1>Not Found</h1>}></Route>
                <Route element={<IsLogin />}>
                    <Route path="/home" element={<Home/>} />
                    <Route path="/detail/:id" element={<Detail/>}/>
                    <Route path="/follow" element={<Follow/>}/>
                </Route>
                <Route element={<IsNotLogin />}>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Register/>}/>
                </Route>
            </Routes>
        }
    </>
    )
}