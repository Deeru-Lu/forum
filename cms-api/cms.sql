-- 内容管理系统
CREATE DATABASE IF NOT EXISTS cms;

use cms;

-- 用户表
CREATE TABLE users(
  id INT PRIMARY KEY auto_increment,
  username VARCHAR(50) NOT NULL, -- 用户名
  password VARCHAR(50) NOT NULL, -- 密码
  email VARCHAR(50) NOT NULL, -- 邮箱
  nickname VARCHAR(50) NOT NULL, -- 昵称
  avatar VARCHAR(100) NULL, -- 头像
  gender bit NULL, -- 性别
  create_time datetime NOT NULL, -- 创建时间
  modify_time datetime NOT NULL -- 修改时间
);


-- 话题表
CREATE TABLE topics(
  id INT PRIMARY KEY auto_increment,
  title VARCHAR(100) NOT NULL, -- 标题
  content TEXT NOT NULL, -- 内容
  user_id INT NOT NULL, -- 所属用户
  create_time DATETIME NOT NULL, -- 发布时间
  modify_time DATE NOT NULL -- 修改时间
);

-- 评论表
CREATE TABLE comments(
  id INT PRIMARY KEY auto_increment,
  content TEXT NOT NULL, -- 评论内容
  create_time DATETIME NOT NULL, -- 发布时间
  modify_time DATE NOT NULL, -- 修改时间2
  article_id INT NOT NULL, -- 所属文章
  user_id INT NOT NULL, -- 所属用户
  reply_id INT NULL -- 所属回复人
);