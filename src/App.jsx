import { useState, useEffect } from "react"

import { Link, BrowserRouter, Routes, Route, Navigate,useNavigate } from "react-router-dom"
import { auth } from "./firebase";
import { signInWithEmailAndPassword, onAuthStateChanged,signOut } from "firebase/auth";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Main } from "./pages/Main";
import { Mypage } from "./pages/Mypage";
import { Choice } from "./pages/Choice";
import { Making } from "./pages/Making";
import { Playing } from "./pages/Playing";
import { Clear } from "./pages/Clear";
import { Archives } from "./pages/Archives";

import kallomate from "../img/kallomate.png"


const App = () => {
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
        <BrowserRouter>
          <header class="text-gray-600 body-font">
            <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
              <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <Link to="/">
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2" > */}
                  <img src={kallomate}  className="w-12 h-12" />
                  {/* <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path> */}
                  {/* </svg> */}
                </Link>
                <span class="ml-3 text-xl">
                  <Link to="/">過労☆メイト</Link></span>
              </a>
              <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                <Link to="/Login" class="mx-2 hover:text-gray-900">ログイン</Link>
                <Link to="/Register" class="mx-2 hover:text-gray-900">新規登録</Link>
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

        </BrowserRouter>
      ) : (
        <>
          <BrowserRouter>
            <header class="text-gray-600 body-font">
              <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <Link to="/">
                      <img src={kallomate} className="w-12 h-12" />

                      {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg> */}
                    </Link>
                  <span class="ml-3 text-xl">
                    <Link to="/">過労☆メイト</Link></span>
                </a>
                <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <Link to="/choice" class="mr-5 hover:text-indigo-500">スタンプラリーで遊ぶ</Link>
                    <Link to="/making" class="mr-5 hover:text-indigo-500">スタンプラリーを作る</Link>
                    <Link to={`/archives/${user.uid}`} class="mr-5 hover:text-indigo-500">旅の記録</Link>
                  <Link to="/mypage" class="mr-5 hover:text-indigo-500">マイページ</Link>
                    <Link to="/" class="mr-5 hover:text-indigo-500" onClick={logout}>ログアウト</Link>
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
                <Route path="/archives/:id" element={<Archives />}/>

            </Routes>

          </BrowserRouter>


        </>
      )
      }
    </>)

}

export default App