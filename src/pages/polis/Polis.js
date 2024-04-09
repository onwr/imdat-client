import React, { useEffect, useState } from "react";
import logo from "../../img/iyimisin.png";
import io from "socket.io-client";
import alarm from "../../assets/voices/alarm.mp3";

const Muhtar = () => {
  const [ihbar, setIhbar] = useState(false);
  const [kisi, setKisi] = useState({});
  const socket = io.connect("https://imdat-server.onrender.com/");
  const audio = new Audio(alarm);

  useEffect(() => {
    socket.on("imdat", (donen) => {
      setKisi(donen);
      handleCagri(donen);
    });

    return () => {
      socket.off("imdat");
    };
  }, []);

  const konus = (metin, ad) => {
    const synth = window.speechSynthesis;
    const utterance1 = new SpeechSynthesisUtterance(metin);
    const utterance2 = new SpeechSynthesisUtterance(ad);

    utterance1.lang = "tr-TR";
    utterance2.lang = "tr-TR";
    utterance1.rate = 0.7;
    utterance2.rate = 0.6;
    utterance1.pitch = 0.2;
    utterance2.pitch = 0.2;

    setTimeout(() => {
      synth.speak(utterance2);
    }, 1000);

    synth.speak(utterance1);
  };

  const handleCagri = (gelen) => {
    setIhbar(true);
    console.log(gelen);
    audio.play();
    setTimeout(() => {
      konus("Çağrı yapan Kişi", gelen.ad);
    }, 6000);
  };

  return (
    <div className="h-screen font-yeni w-screen items-center flex flex-col">
      <img src={logo} className="w-36 h-auto mt-52" />
      <p className="font-bold text-gray-800 text-4xl mt-5">İMDAT</p>
      {ihbar ? (
        <div className="mt-10 flex flex-col items-center">
          <p className="text-2xl">{kisi.ad}</p>
          <p className="mt-3">KOORDİNATLARI</p>
          <p className="w-80 p-2 text-center bg-gray-200 rounded-full mt-2">
            {kisi.koordinatim.latitude}, {kisi.koordinatim.longitude}
          </p>
        </div>
      ) : (
        <div className="mt-20">
          <p className="text-xl">Aktif Çağrı Bulunamadı.</p>
        </div>
      )}
    </div>
  );
};

export default Muhtar;
