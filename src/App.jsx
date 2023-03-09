import { Link, BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Main } from "./pages/Main";
import { Mypage } from "./pages/Mypage";
import { Choice } from "./pages/Choice";
import { Making } from "./pages/Making";


const App = () => {
  return (
    <BrowserRouter>
      <header class="text-gray-600 body-font">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span class="ml-3 text-xl">
              <Link to="/main">過労☆メイト</Link></span>
          </a>
          <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link to="/Login" class="mr-5 hover:text-gray-900">ログイン</Link>
            <Link to="/Register" class="mr-5 hover:text-gray-900">新規登録</Link>
            <Link to="" class="mr-5 hover:text-gray-900"></Link>
            <Link to="" class="mr-5 hover:text-gray-900"></Link>
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
        <Route path="/main" element={<Main />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path="/choice" element={<Choice />}></Route>
        <Route path="/making" element={<Making />}></Route>
      </Routes>

    </BrowserRouter>


  )


}

export default App