import React, { useEffect, useState } from "react";
import logo from "../../img/iyimisin.png";
import io from "socket.io-client";

const Vatandas = () => {
  const [gonderildi, setGonderildi] = useState(false);
  const [ad, setAd] = useState("");
  const [bilgi, setBilgi] = useState(false);
  const [koordinatim, setKoordinatim] = useState({
    latitude: null,
    longitude: null,
  });

  const socket = io.connect("https://imdat-server.onrender.com/");

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setKoordinatim({ latitude, longitude });
          },
          (error) => {
            console.error("Konum alınamadı.", error);
          }
        );
      } else {
        console.error("Tarayıcı konum hizmetlerini desteklemiyor.");
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    const isim = localStorage.getItem("isim");

    if (isim) {
      setAd(isim);
      setBilgi(true);
    } else {
      setBilgi(false);
    }
  }, []);

  const handleImdat = () => {
    socket.emit("ihbar", { ad, koordinatim });
    setGonderildi(true);
  };

  const handleKaydet = () => {
    localStorage.setItem("isim", ad);
    setBilgi(true);
  };
  return (
    <div className="h-screen font-yeni w-screen flex flex-col items-center">
      <div className="mt-52">
        <img src={logo} className="w-32 mx-auto" />
        <p className="text-4xl text-center font-medium mt-5">İMDAT</p>
        <div className="mt-10 flex flex-col font-semibold text-center">
          {bilgi ? (
            <p className="text-xl font-bold">{ad}</p>
          ) : (
            <>
              <input
                className="p-2 w-80 bg-gray-100 text-center rounded-full outline-none"
                placeholder="AD SOYAD"
                value={ad}
                onChange={(e) => setAd(e.target.value)}
              />
              <button
                onClick={handleKaydet}
                className="p-2 w-80 bg-green-200 text-center rounded-full mt-2"
              >
                Kaydet
              </button>
            </>
          )}
          <p className="p-2 w-80 bg-blue-200 rounded-full mt-4">
            {koordinatim.latitude}, {koordinatim.longitude}
          </p>
        </div>
        {gonderildi ? (
          <p className="mt-5">Çağrı gönderildi, ekipler yönlendiriliyor.</p>
        ) : (
          <>
            <button
              onClick={handleImdat}
              className="w-80 p-2 bg-red-400 text-xl rounded-full mt-10 font-medium hover:bg-red-300"
            >
              YARDIM EDİN
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Vatandas;
