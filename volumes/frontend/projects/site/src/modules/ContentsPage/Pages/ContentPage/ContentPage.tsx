import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ApiService from "@/services";
import CalcProfnastil from "@/components/Calculation/calc-profnastil";
import CalcSetka from "@/components/Calculation/calc-setka";
import CalcMetall from "@/components/Calculation/calc-metall";
// import ContentSlider from "@/components/Contents/image-gallery/content-slider";

const Container = () => {

  const {id} = useParams();
  const [data, setData] = useState(null);
  //const [files, setFiles] = useState([]);

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    const res = await ApiService.get(`/contents/get/${id}`, {}, {
      query: {
        relations: ['files'],
      }
    });

    window.description = res.data.name;
    setData(res.data);

    // if (typeof res.data.files == "object") {
    //   setFiles(res.data.files);
    // }
  }

  if (!data)  {
    return <p></p>;
  }

  return (
    <div className="main-layout-content-page">

      <Helmet>
        <title>{data.name}</title>
        <meta name="description" content={data.description} />
        <meta name="keywords" content={data.keywords} />
      </Helmet>

      <h1>{data.name}</h1>

      <div className="main-layout-content-page-grid">

        <div dangerouslySetInnerHTML={{__html: data.text}}></div>

        {data.id == 29 &&
            <div className="calc-block">
                <div className="calc-block-header">Рассчитать стоимость</div>
                <div className="calc-block-body"><CalcProfnastil/></div>
            </div>
        }
        {data.id == 31 &&
            <div className="calc-block">
                <div className="calc-block-header">Рассчитать стоимость</div>
                <div className="calc-block-body"><CalcSetka/></div>
            </div>
        }
        {data.id == 36 &&
            <div className="calc-block">
                <div className="calc-block-header">Рассчитать стоимость</div>
                <div className="calc-block-body"><CalcMetall/></div>
            </div>
        }
      </div>

      {/*{!data.files.length ? null :*/}
      {/*  <ContentSlider data={data.files}/>*/}
      {/*}*/}

    </div>
  );
};

export default Container;