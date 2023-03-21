const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    // 시작점
    entry: './src/index.js',
    output: {
        // 나가는 경로와 파일명 지정
        path: path.resolve(__dirname, 'docs'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                // 정규식 사용, 이름이 .js 로 끝나는 파일 지정
                test: /\.js$/,
                // 빼주지 않으면 빌드 하는 시점에 노드 모듈까지 싹 다 빌드, 나중에 최적화를 하거나 할 수 없어서 빼주는 것
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        // 프리셋이 여러개이기 때문에 presets, 하나라면 preset
                        presets: [
                            ["@babel/preset-env"],
                            // runtime automatic => 리액트 17버전 이상부터 사용가능한데, 빌드 하는 동시에 변환시켜 적용해주는 옵션
                            // 사용하지 않으면 에러가 발생하거나 흰 페이지가 나오는 등 원하는 대로 동작하지 않을 수 있음(거의 필수적으로 넣어야 함)
                            ["@babel/preset-react", {runtime: "automatic"}]
                        ]
                    }
                }
            },
            {
                // .css 로 끝나는 파일 지정
                test: /\.css$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    // 모듈과 달리 부가적인 기능이기 때문에 모듈 밖에 이어서 작성해야 함
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html")
        })
    ]
}