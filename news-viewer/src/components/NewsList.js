import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import usePromise from "../lib/usePromise";

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    maring: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const sampleArticle = {
    title : '제목',
    description : '내용',
    url : 'https://goggle.com',
    urlToImage : 'https://via.placeholder.com/160',
};

const NewsList = ({category}) => {
    const [loading, response, error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`;
        console.log(query);
        return axios.get(
            `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=43aea1167f004057a24576d5bf4f06fb`
        )
    },[category]);

    //대기 중
    if(loading){
        return <NewsListBlock>대기 중...</NewsListBlock>
    }
    //아직 response 값이 설정되지 않았을 때
    if(!response){
        return null;
    }
    //error 발생
    if(error){
        return <NewsListBlock>에러 발생</NewsListBlock>
    }

    const { articles} = response.data;
    //response 값이 유효할 때
    return (

        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    );
};

export default NewsList;