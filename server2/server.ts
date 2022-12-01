import * as fs from 'fs';
import * as http from 'http';



fs.readdir('./txt', (err, filelist)=>{
  const result:any = {};
  const data:string[]= [];
  // console.log(filelist)
  filelist.map(value => {
    data.push(value.split('.')[0]);
    // console.log(data)
  })
  data.forEach(value => {
    // console.log(value)
    result[value] = fs.readFileSync(`./txt/${value}.txt`,'utf8');
  })
  // console.log("data", data)
  fs.writeFileSync("txt.json", JSON.stringify(result))
})
// readdir로 txt 폴더에 있는 파일들 불러옴
// readdir은 비동기, 비동기니까 콜백함수 필요


const file = fs.readdirSync('./txt')
// console.log(file)
// readdirSync는 동기, 콜백함수 필요 없음. 

// const txt = (pathString:string, callback:any)=>{
//   fs.readdir(pathString, (err, filelist)=>{
//     const result:any = {};
//     const data:string[]= [];
//     // console.log(filelist)
//     filelist.map(value => {
//       data.push(value.split('.')[0]);
//       // console.log(data)
//     })
//     data.forEach(value => {
//       result[value] = value
//     })
//     console.log("data", data)
//     console.log("result", result)
//     callback(result);
//     return result
    
//   })
// }

// * json문자열을 js 객체로 변환할 때 json객체의 parse() 메서드 사용, parse() 메서드는 json 문자열을 인자로 받고 결과값으로 js 객체를 반환 
// * json 문자열에서는 key를 나타낼 때 반드시 "" 쌍따옴표로 감싸 줌. js 객체는 쌍따옴표를 꼭 사용할 필요가 없음. 

// * js 객체를 json으로 변환할 때는 json객체의 stringify()메서드를 사용. json.stringify() 메서드는 js 객체를 인자로 받고 json 문자열을 반환 

const server = http.createServer((req:http.IncomingMessage, res:http.ServerResponse) => {

  const method = req.method;
  switch(method){
    case 'GET':
      console.log('get이다')

      const read = fs.readFileSync('txt.json','utf8')
      // console.log(read)
      // txt.json 파일을 utf8로 읽음. json파일이라서 read.footer 이런 형식이 안됨. 

    
      const parse = JSON.parse(read)   // utf8로 읽은 json 파일을 다시 parse함. js 객체 형식으로 변환. 객체니까 parse.head 형식이 가능. 객체 value만 가져올 수 있음. 
      
      // console.log(parse)
      // const headText = parse.head
      // const headerText = parse.header
      // const mainText = parse.main
      // const footerText = parse.footer
      // parse.body = headerText + mainText + footerText
      let {head,header,main,footer,body} = parse //얘는 const로 두면 안됨
      // 위의 변수들을 구조분해할당으로 코드 줄임.(객체니까 가능, 배열도 []로 가능)
      body = header + main + footer
       // body value갑을 header, main, footer 내용 합쳐서 추가. 
      console.log(body)
      // const body = header+main+footer
    
      // const bodyText = parse.body
      // console.log(parse)
    

      res.writeHead(200, {'Content-Type' : "text/html; charset=utf-8"})
      // res.writeHead(200, {'Content-Type' : "application/json"})

      res.end(`${head}${body}`)
      // 얘는 text/html 형식일 때 html로 인식하고 html 형식으로 출력함. 얘를 application/json으로 내보내면 그냥 string으로 인식하고 내보냄. 

      // res.end(read)
      // json형식인 read를 읽으려면 application/json 형식으로 내보내기. 이러면 api가져올 때 보던 방식으로 나옴. 얘를 text/html 형식으로 내보내면 json으로 나오긴 하는데 한글을 인식하지 못함. text/html; charset-tuf-8 해주면 한글도 나오긴 함. html처럼 태그가 들어가긴 함. 
    break;
    case 'POST':
      console.log("post다")

  } 
    
})

server.listen(5000,(err?:ErrorCallback)=>{
  if(err) throw err;
  console.log(`5000에서 서버가 실행되고 있습니다!`)
})    