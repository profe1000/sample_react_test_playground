import "./Supports-Comp.css";
import { useEffect } from "react";

export const SupportsComp = () => {
  type ISupportSystem = {
    id: number;
    icon: string;
    description: string;
    details: string;
  };

  const supportText: ISupportSystem[] = [
    {
      id: 1,
      icon: "/images/support/Component 13.svg",
      description: "Location",
      details: "10 Mast Street, Barking, London, United Kingdom",
    },
    {
      id: 2,
      icon: "/images/support/Component 13-1.svg",
      description: "Call US",
      details: "+44 7424 607827",
    },
    {
      id: 3,
      icon: "/images/support/Component 13-2.svg",
      description: "Email Address",
      details: "info@Wokkr.com",
    },
    {
      id: 4,
      icon: "/images/support/whatsapp.svg",
      description: "Whatsapp",
      details: "+44 7424 607827",
    },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "http://code.tidio.co/ut1uy5chjphoti0znreqy6llo2hblvnv.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w3-col" style={{ minHeight: "400px" }}>
      <div className="w3-col">
        <div className="w3-content">
          <div className="w3-container">
            <div className="w3-col s12">
              <div className="support-system w3-center">
                <p className="support-system-header">Our Support system</p>
                <img
                  className="support-system-image"
                  src="/images/support/support.png"
                  alt=""
                />
                <div className="support-system-wrapper">
                  {supportText.map((support) => (
                    <div
                      key={support.id}
                      className={`support-container ${
                        support.id === 4 ? "custom-style" : ""
                      }`}
                    >
                      <img src={support.icon} alt="" />
                      <p className="support-description">
                        {support.description}
                      </p>
                      <p className="support-details">{support.details}</p>
                    </div>
                  ))}
                  {/* Tidio live chat button */}
                  <div className="support-container">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportsComp;
