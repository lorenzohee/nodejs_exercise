# nodejs_exercise

1.环境：

Node.js ： 0.12.5

Express ： 4.13.1

MongoDB ： 2.6.1

2.搭建环境：

    1).搭建express：
        配置express，命令：npm install -g express-generator
        新建工程：express -e blog
                  cd blog && npm install
        搭建supervisor：npm -g install supervisor
        这是一个进程管理工具，安装好后不用每次修改代码后重启nodejs了
        启动项目：supervisor bin/www

3.博客讲解参照

https://github.com/nswbmw/N-blog/wiki/%E7%AC%AC1%E7%AB%A0--%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8D%95%E7%9A%84%E5%8D%9A%E5%AE%A2

4.mongodb安装（略）

5.启动mongodb：./mongod --dbpath ../blog/