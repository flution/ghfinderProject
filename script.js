//쿼리 셀렉트 가져오는 것들
const input = document.querySelector("input");
const btn = document.querySelector(".searchbtn");

//이건 깃허브 url에서 따올 수 있는 쿼리를 해당 html에 붙여주겠다.
const user = document.querySelector(".githubUser");
const login = document.querySelector(".githubUserName");
const joined = document.querySelector(".githubJoinedDate");
const repo = document.querySelector(".repoTotal");
const follower = document.querySelector(".followerTotal");
const followings = document.querySelector(".followingTotal");
const locations = document.querySelector(".locations");
const twit = document.querySelector(".twit");
const websites = document.querySelector(".websites");
const companies = document.querySelector(".companies");
const gitBio = document.querySelector(".githubBio");
let img = document.createElement("img");
let block = document.querySelector(".mainImg");


//이벤트리스너 잡아서 깃허브에서 url을 가져와서 json 패싱하는것. dateData는 뭔지 모름? 몰?루?
btn.addEventListener("click", function () {
  const url = `https://api.github.com/users/${input.value}`;
  async function getUrl() {
    const response = await fetch(url);
    const data = await response.json();
    const dateData = data.created_at.slice(0, data.created_at.length - 10);


    //src부분을 avatar에 넣어줌. 
    img.src = data.avatar_url;
    block.appendChild(img);
    block.style.border = "none";

    //innerHTML로 HTML에 api로 가져온 부분을 data를 잡아주고 넣어줘야함.
    user.innerHTML = data.name;
    login.innerHTML = `@${data.login}`;
    joined.innerHTML = `가입 일자 ${dateData}`;
    repo.innerHTML = data.public_repos;
    follower.innerHTML = data.followers;
    followings.innerHTML = data.following;
    locations.innerHTML =
      data.location === "" || data.location === null
        ? "No Location"
        : data.location;
    twit.innerHTML =
      data.twitter_username === "" || data.twitter_username === null
        ? "No Twitter"
        : data.twitter_username;
    websites.innerHTML =
      data.blog === "" || data.blog === null ? "No Website" : data.blog;
    companies.innerHTML =
      data.company === "" || data.company === null
        ? "No Company"
        : data.company;
    gitBio.innerHTML =
      data.bio === "" || data.bio === null
        ? "이 프로필에는 바이오가 없습니다..."
        : data.bio;
  }
  getUrl();
  input.value = "";
});



//localstorage에 저장하는 영역
const toggle = function (e) {
  if (e.currentTarget.classList.contains("light--hidden")) {
    document.documentElement.setAttribute("color-mode", "light");
    localStorage.setItem("color-mode", "light");
    return;
  }
  document.documentElement.setAttribute("color-mode", "dark");
  localStorage.setItem("color-mode", "dark");
};


//버튼을 누르면 이벤트리스너가 발동해서 컬러모드를 바꾸는 것.
const toggleColorButtons = document.querySelectorAll(".color-mode__btn");

toggleColorButtons.forEach((btn) => 
{
  btn.addEventListener("click", toggle);
});
