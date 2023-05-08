import { useState, useEffect } from "react"

import { Link, BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom"
import { auth } from "./firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Main } from "./pages/Main";
import { Mypage } from "./pages/Mypage";
import { Choice } from "./pages/Choice";
import { Making } from "./pages/Making";
import { Playing } from "./pages/Playing";
import { Clear } from "./pages/Clear";
import { Archives } from "./pages/Archives";
import { Retire } from "./pages/Retire";

import kallomate from "../img/kallomate.png"

function App() {
 
  return (
    <BrowserRouter>
      <MyComponent />
    </BrowserRouter>
  );
}


const MyComponent = () => {
  
  const location = useLocation();
  const currentPathname = location.pathname;

  


  const [user, setUser] = useState();
  
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

    });
  }, []);

  // const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    // navigate("/");
  }

  return (
    <>
      {!user ? (
        // <BrowserRouter>
        <>
          <header class="text-gray-600 body-font">

            <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
              <a class="flex title-font font-medium items-center text-gray-900 mb-4 sm:mb-0">
                <Link to="/">
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2" > */}
                  <img src={kallomate} className="w-12 h-12" />
                  {/* <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path> */}
                  {/* </svg> */}
                </Link>
                <span class="ml-3 text-xl">
                  <Link to="/">過労☆メイト</Link></span>
              </a>
              <nav class="sm:ml-auto sm:mr-auto flex flex-wrap items-center text-base justify-center">
              
                <Link to="/login" className={(currentPathname === '/login') ? "mx-2 font-semibold text-indigo-500" : "mx-2"}>ログイン</Link>
             
             
                <Link to="/register" className={(currentPathname === '/register') ? "mx-2 font-semibold text-indigo-500" : "mx-2"}>新規登録</Link>
                
                {/* <Link to="" class="mr-5 hover:text-gray-900"></Link>
                <Link to="" class="mr-5 hover:text-gray-900"></Link> */}
              </nav>
            </div>
          </header>
          {/* <h1 className="text-3xl font-bold ">
        過労☆メイト
      </h1>     
<ul className="">
      <li className="m-1">
        <Link to="/Login">ログイン</Link>
      </li>
      <li className="m-1">

        <Link to="/Register">会員登録</Link>
      </li>
</ul>
   */}
          <hr />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Main />}></Route>
            <Route path="/mypage" element={<Mypage />}></Route>
            <Route path="/choice" element={<Choice />}></Route>
            <Route path="/making" element={<Making />}></Route>
            <Route path="/playing/:id" element={<Playing />} />

          </Routes>
        </>
        // </BrowserRouter>

      ) : (
        <>
          {/* <BrowserRouter> */}
          <header class="text-gray-600 body-font">
            <div class="container mx-auto flex flex-wrap p-5 flex-col sm:flex-row items-center">
              <a class="flex title-font font-medium items-center text-gray-900 mb-4 sm:mb-0">
                <Link to="/">
                  <img src={kallomate} className="w-12 h-12" />

                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg> */}
                </Link>
                <span class="ml-3 text-xl">
                  <Link to="/">過労☆メイト</Link></span>
              </a>
              <nav class="sm:ml-auto sm:mr-auto flex flex-wrap items-center text-base justify-center">
                  <Link to="/choice" className={(currentPathname === '/choice') ? "mx-2 font-semibold text-indigo-500" : "mx-2"}>スタンプラリーで遊ぶ</Link>
                  <Link to="/making" className={(currentPathname === '/making') ? "mx-2 font-semibold text-indigo-500" : "mx-2"}>スタンプラリーを作る</Link>
                  <Link to={`/archives/${user.uid}`} className={(currentPathname === `/archives/${user.uid}`) ? "mx-2 font-semibold text-indigo-500" : "mx-2"}>旅の記録</Link>
                  <Link to="/mypage" className={(currentPathname === '/mypage') ? "mx-2 font-semibold text-indigo-500" : "mx-2"}>マイページ</Link>
                {/* <Link to="/" class="mr-5 hover:text-indigo-500" onClick={logout}>ログアウト</Link> */}
              </nav>
            </div>
          </header>
          {/* <h1 className="text-3xl font-bold ">
        過労☆メイト
      </h1>     
<ul className="">
      <li className="m-1">
        <Link to="/Login">ログイン</Link>
      </li>
      <li className="m-1">

        <Link to="/Register">会員登録</Link>
      </li>
</ul>
   */}
          <hr />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Main />}></Route>
            <Route path="/mypage" element={<Mypage />}></Route>
            <Route path="/choice" element={<Choice />}></Route>
            <Route path="/making" element={<Making />}></Route>
            <Route path="/playing/:id" element={<Playing />} />
            <Route path="/clear" element={<Clear />} />
            <Route path="/archives/:id" element={<Archives />} />
            <Route path="/retire" element={<Retire />} />


          </Routes>

          {/* </BrowserRouter> */}


        </>
      )
      }
    </>)

}

export default App