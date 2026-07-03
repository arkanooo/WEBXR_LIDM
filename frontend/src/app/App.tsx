import { useEffect, useState, lazy, Suspense } from "react";
import { HashRouter, Routes, Route, useNavigate, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import svgPaths from "../imports/Design-1/svg-jznrhsi95h";
import KomponenPage from "./pages/KomponenPage";
import PlaceholderPage from "./pages/PlaceholderPage";

// three.js is heavy — load the 3D/AR detail page only when it is opened.
const KomponenDetailPage = lazy(() => import("./pages/KomponenDetailPage"));
import imgImage23 from "../imports/Design-1/160f1dac8fe9fd273b1ebc605342a06f7934a7d9.png";
import logo3d from "../assets/Logo 3DUTOPIA 2 tes.png";
import imgImage44 from "../imports/Design-1/6f81fc780204799bc4e9644a144e373dbc5cf509.png";
import imgImage45 from "../imports/Design-1/3fb5d238b0206ce37d420f17b6ecda52b8d3da49.png";
import imgImage46 from "../imports/Design-1/632ee31821342e74b585e6ee403db7e979a135ad.png";

const DESIGN_W = 1440;
const DESIGN_H = 1159;

function Group2() {
  return (
    <div className="absolute h-[162.565px] left-[856.59px] top-[408.66px] w-[61.266px]" style={{ zIndex: 4 }}>
      <div className="absolute inset-[-0.25%_-1.63%_-0.61%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 62.266 163.966">
          <g id="Group 2">
            <path d={svgPaths.p33b4de00} fill="var(--fill-0, #FB7943)" id="Ellipse 3" />
            <ellipse cx="44.6892" cy="108.549" id="Ellipse 1" rx="16.5768" ry="54.4171" stroke="var(--stroke-0, white)" strokeWidth="2" />
            <ellipse cx="46.7166" cy="108.549" id="Ellipse 4" rx="10.1645" ry="40.0225" stroke="var(--stroke-0, #BFFD44)" strokeWidth="2" />
            <rect fill="var(--fill-0, #BFFD44)" height="122.83" id="Rectangle 5" rx="5.55798" stroke="var(--stroke-0, black)" transform="rotate(1.01436 45.7948 0.402497)" width="11.116" x="45.7948" y="0.402497" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute h-[858.877px] left-[512.11px] top-[297.25px] w-[543.182px]" style={{ zIndex: 4 }}>
      <div className="absolute inset-[0_-0.18%_-0.12%_-0.18%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 545.182 859.877">
          <g id="Group 1000001333">
            <path d={svgPaths.p1e9c3480} id="Vector 7" stroke="var(--stroke-0, #BFFD44)" strokeLinecap="round" strokeWidth="2" />
            <path d={svgPaths.p3c300680} id="Vector 8" stroke="var(--stroke-0, #BFFD44)" strokeLinecap="round" strokeWidth="2" />
            <path d={svgPaths.pad2cb00} id="Vector 19" stroke="var(--stroke-0, #BFFD44)" strokeLinecap="round" strokeWidth="2" />
            <path d={svgPaths.p2cdf7d00} id="Vector 18" stroke="var(--stroke-0, #BFFD44)" strokeLinecap="round" strokeWidth="2" />
            <g id="Group 1000001330">
              <path d={svgPaths.p2c046025} id="Vector 9" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
              <path d={svgPaths.p2de3dd00} id="Vector 10" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
              <path d={svgPaths.p2eaf4380} id="Vector 11" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
              <path d={svgPaths.p1d65f600} id="Vector 12" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
            </g>
            <path d={svgPaths.p2f486240} id="Vector 13" stroke="var(--stroke-0, #BFFD44)" strokeLinecap="round" strokeWidth="2" />
            <path d={svgPaths.p282b13e0} id="Vector 14" stroke="var(--stroke-0, #BFFD44)" strokeLinecap="round" strokeWidth="2" />
            <g id="Group 1000001331">
              <path d={svgPaths.pd47d180} id="Vector 15" stroke="var(--stroke-0, #BFFD44)" strokeLinecap="round" strokeWidth="2" />
              <path d={svgPaths.p36fcdd00} id="Vector 16" stroke="var(--stroke-0, #BFFD44)" strokeLinecap="round" strokeWidth="2" />
              <path d={svgPaths.p13002d00} id="Vector 17" stroke="var(--stroke-0, #BFFD44)" strokeLinecap="round" strokeWidth="2" />
            </g>
            <g id="Group 1000001332">
              <path d={svgPaths.p3073d360} id="Vector 15_2" stroke="var(--stroke-0, #BFFD44)" strokeLinecap="round" strokeWidth="2" />
              <path d={svgPaths.p32c326e0} id="Vector 16_2" stroke="var(--stroke-0, #BFFD44)" strokeLinecap="round" strokeWidth="2" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[439px] top-[242px]">
      <div className="absolute h-[992.069px] left-[439px] top-[242px] w-[661.218px]" data-name="image 23" style={{ zIndex: 3 }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" style={{ filter: 'brightness(0) drop-shadow(0px 0px 15px rgba(191,253,68,0.4))' }} src={imgImage23} />
      </div>
      <div className="absolute h-[183.379px] left-[639.08px] top-[436.18px] w-[208.708px]" style={{ zIndex: 4 }}>
        <div className="absolute inset-[-0.27%_-0.24%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 209.708 184.379">
            <path d={svgPaths.p10728900} fill="var(--fill-0, #BFFD44)" id="Vector 1" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[186.28px] left-[625.87px] top-[427.32px] w-[230.181px]" style={{ zIndex: 4 }}>
        <div className="absolute inset-[-0.54%_-0.43%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 232.182 188.28">
            <path d={svgPaths.p29a9c900} id="Vector 2" stroke="var(--stroke-0, white)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[97.119px] left-[658.7px] top-[521.44px] w-[208.007px]" style={{ zIndex: 4 }}>
        <div className="absolute inset-[-1.03%_-0.3%_-1.35%_-0.38%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 209.432 99.4271">
            <path d={svgPaths.pb40200} id="Vector 5" stroke="var(--stroke-0, #F8EC7D)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[74.457px] left-[624.09px] top-[419.77px] w-[294.511px]" style={{ zIndex: 4 }}>
        <div className="absolute inset-[-1.34%_-0.33%_-0.42%_-0.34%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 296.482 75.7699">
            <path d={svgPaths.p223e8800} id="Vector 3" stroke="var(--stroke-0, white)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[140.784px] left-[855.35px] top-[437.06px] w-[66.465px]" style={{ zIndex: 4 }}>
        <div className="absolute inset-[-0.58%_-1.5%_-0.71%_-1.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 68.4634 142.603">
            <path d={svgPaths.pde08340} id="Vector 4" stroke="var(--stroke-0, white)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <Group2 />
      <Group12 />
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute contents left-[1240.76px] top-[-442.08px]">
      <div className="absolute flex h-[1201.688px] items-center justify-center left-[1240.76px] top-[-442.08px] w-[238px]">
        <div className="-rotate-90 flex-none">
          {/* Changed: Metaverse → 3DUTOPIA */}
          <p className="[word-break:break-word] font-['Chivo:Black',sans-serif] font-black leading-[normal] relative text-[200px] text-[rgba(45,45,45,0.5)] w-[1201.688px]">3DUTOPIA</p>
        </div>
      </div>
      <div className="absolute flex h-[1201.688px] items-center justify-center left-[1251.16px] top-[778.21px] w-[238px]">
        <div className="-rotate-90 flex-none">
          {/* Changed: Metaverse → 3DUTOPIA */}
          <p className="[word-break:break-word] font-['Chivo:Black',sans-serif] font-black leading-[normal] relative text-[200px] text-[rgba(45,45,45,0.5)] w-[1201.688px]">3DUTOPIA</p>
        </div>
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-[921.7px] top-[784.09px]">
      <div className="absolute bg-[#010101] h-[13.522px] left-[926.52px] rounded-[8.01px] top-[784.09px] w-[3.885px]" />
      <div className="absolute flex h-[3.885px] items-center justify-center left-[921.7px] top-[788.91px] w-[13.522px]">
        <div className="flex-none rotate-90">
          <div className="bg-[#010101] h-[13.522px] relative rounded-[8.01px] w-[3.885px]" />
        </div>
      </div>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute h-[11.408px] left-[946.87px] top-[784.77px] w-[11.493px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4933 11.4083">
        <g id="Group 8">
          <circle cx="2.02836" cy="2.02836" fill="var(--fill-0, #010101)" id="Ellipse 6" r="2.02836" />
          <circle cx="2.02885" cy="9.3799" fill="var(--fill-0, #010101)" id="Ellipse 9" r="2.02836" />
          <circle cx="9.46487" cy="9.3799" fill="var(--fill-0, #010101)" id="Ellipse 7" r="2.02836" />
          <circle cx="9.46487" cy="2.02836" fill="var(--fill-0, #010101)" id="Ellipse 8" r="2.02836" />
        </g>
      </svg>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents left-[913.68px] top-[753.27px]">
      <div className="absolute h-[31.575px] left-[913.68px] top-[777.77px] w-[54.439px]">
        <div className="absolute inset-[-3.81%_-2.21%_8.41%_-2.21%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56.8419 30.1225">
            <path d={svgPaths.p20e89200} id="Rectangle 6" stroke="var(--stroke-0, #010101)" strokeWidth="2.40306" />
          </svg>
        </div>
      </div>
      <Group7 />
      <Group8 />
      <div className="absolute h-[24.258px] left-[934.58px] top-[753.27px] w-[8.676px]">
        <div className="absolute inset-[-2.89%_-13.86%_0_-13.85%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0802 24.9589">
            <path d={svgPaths.pae19200} id="Vector 6" stroke="var(--stroke-0, #010101)" strokeWidth="2.40306" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents h-[54.961px] left-[869.95px] top-[811.86px] w-[57.171px]">
      <div className="absolute flex h-[16.427px] items-center justify-center left-[913.36px] top-[843.68px] w-[11.732px]">
        <div className="flex-none rotate-[-162.89deg]">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[7.715px]">P</p>
        </div>
      </div>
      <div className="absolute flex h-[14.537px] items-center justify-center left-[897.6px] top-[838.14px] w-[10.317px]">
        <div className="flex-none rotate-[-150.15deg]">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[3.395px]">l</p>
        </div>
      </div>
      <div className="absolute flex h-[15.954px] items-center justify-center left-[884.09px] top-[830.17px] w-[15.429px]">
        <div className="flex-none rotate-[-137.87deg]">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[7.406px]">a</p>
        </div>
      </div>
      <div className="absolute flex h-[13.448px] items-center justify-center left-[870.87px] top-[817.49px] w-[15.968px]">
        <div className="flex-none rotate-[-122.65deg]">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[6.48px]">y</p>
        </div>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-[861.24px] top-[709.33px]">
      <div className="absolute flex h-[8.332px] items-center justify-center left-[861.24px] top-[785.21px] w-[14.813px]">
        <div className="-rotate-90 flex-none">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[8.332px]">B</p>
        </div>
      </div>
      <div className="absolute flex h-[11.082px] items-center justify-center left-[862.55px] top-[762.87px] w-[16.233px]">
        <div className="flex-none rotate-[-73.17deg]">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[7.098px]">e</p>
        </div>
      </div>
      <div className="absolute flex h-[13.304px] items-center justify-center left-[869.5px] top-[744.57px] w-[16.006px]">
        <div className="flex-none rotate-[-58.26deg]">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[6.48px]">y</p>
        </div>
      </div>
      <div className="absolute flex h-[15.657px] items-center justify-center left-[880.51px] top-[728.98px] w-[15.313px]">
        <div className="flex-none rotate-[-43.19deg]">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[7.098px]">o</p>
        </div>
      </div>
      <div className="absolute flex h-[16.56px] items-center justify-center left-[896.89px] top-[716.47px] w-[13.329px]">
        <div className="flex-none rotate-[-27.03deg]">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[7.406px]">n</p>
        </div>
      </div>
      <div className="absolute flex h-[15.932px] items-center justify-center left-[917.15px] top-[709.33px] w-[10.032px]">
        <div className="flex-none rotate-[-10.72deg]">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[7.406px]">d</p>
        </div>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents h-[158.587px] left-[931.44px] top-[714.31px] w-[100.604px]">
      <div className="absolute flex h-[15.441px] items-center justify-center left-[960.13px] top-[714.89px] w-[10.068px]">
        <div className="flex-none rotate-[23.1deg]">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[4.629px]">I</p>
        </div>
      </div>
      <div className="absolute flex h-[18.286px] items-center justify-center left-[971.98px] top-[721.81px] w-[17.809px]">
        <div className="flex-none rotate-[40.18deg]">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[10.801px]">m</p>
        </div>
      </div>
      <div className="absolute flex h-[13.834px] items-center justify-center left-[990.37px] top-[742.84px] w-[16.53px]">
        <div className="flex-none rotate-[59.91deg]">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[7.406px]">a</p>
        </div>
      </div>
      <div className="absolute flex h-[10.489px] items-center justify-center left-[998.84px] top-[762.21px] w-[16.094px]">
        <div className="flex-none rotate-[75.92deg]">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[7.098px]">g</p>
        </div>
      </div>
      <div className="absolute flex h-[3.94px] items-center justify-center left-[1002.28px] top-[781.83px] w-[14.928px]">
        <div className="flex-none rotate-[87.88deg]">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[3.395px]">i</p>
        </div>
      </div>
      <div className="absolute flex h-[9.901px] items-center justify-center left-[1001.46px] top-[791.68px] w-[15.886px]">
        <div className="flex-none rotate-[100.15deg]">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[7.406px]">n</p>
        </div>
      </div>
      <div className="absolute flex h-[13.231px] items-center justify-center left-[995.81px] top-[809.34px] w-[16.561px]">
        <div className="flex-none rotate-[116.47deg]">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[7.406px]">a</p>
        </div>
      </div>
      <div className="absolute flex h-[12.781px] items-center justify-center left-[988.03px] top-[824.58px] w-[14.16px]">
        <div className="flex-none rotate-[129.67deg]">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[4.32px]">t</p>
        </div>
      </div>
      <div className="absolute flex h-[13.386px] items-center justify-center left-[980.93px] top-[832.94px] w-[12.305px]">
        <div className="flex-none rotate-[138.84deg]">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[3.395px]">i</p>
        </div>
      </div>
      <div className="absolute flex h-[16.393px] items-center justify-center left-[970.38px] top-[839.12px] w-[13.422px]">
        <div className="flex-none rotate-[150.8deg]">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[7.098px]">o</p>
        </div>
      </div>
      <div className="absolute flex h-[16.102px] items-center justify-center left-[953.96px] top-[847.26px] w-[10.558px]">
        <div className="flex-none rotate-[166.96deg]">
          <p className="[word-break:break-word] font-['Chivo:Regular',sans-serif] font-normal h-[14.813px] leading-[normal] relative text-[#000002] text-[17.622px] w-[7.406px]">n</p>
        </div>
      </div>
    </div>
  );
}

function Group({ activeIndex }: { activeIndex: number }) {
  const badgeText = CAROUSEL_DATA[activeIndex].badgeText;
  const navigate = useNavigate();
  const radius = 66; 
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="absolute contents left-[861.24px] top-[708.58px]" data-name="Group">
      <div className="absolute left-[841px] top-[687px] w-[197.254px] h-[197.254px] group" style={{ zIndex: 10, pointerEvents: 'auto', cursor: 'pointer' }} onClick={() => navigate(CAROUSEL_DATA[activeIndex].path)}>
        <svg viewBox="0 0 197.254 197.254" className="absolute inset-0 size-full block animate-[spin_20s_linear_infinite] group-hover:scale-105 transition-transform duration-300">
          <path id="textCircle" d={`M 98.627, 98.627 m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`} fill="transparent" />
          <text className="font-['Chivo',sans-serif] font-bold text-[15px] fill-[#000002] uppercase tracking-wide">
            <textPath href="#textCircle" startOffset="0%" textAnchor="start" textLength={circumference} lengthAdjust="spacing">
              {badgeText.repeat(2)}
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}

function Group6({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="absolute left-0 top-0 w-full h-full" style={{ zIndex: 5, pointerEvents: 'none' }}>
    <div className="absolute contents left-[841px] top-[687px]">
      <div className="absolute left-[841px] size-[197.254px] top-[687px]">
        <div className="absolute inset-[2.92%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 185.727 185.727">
            <path d={svgPaths.p1fec1280} fill="var(--fill-0, #CACBCF)" id="Star 1" />
          </svg>
        </div>
      </div>
      <Group9 />
      <Group activeIndex={activeIndex} />
    </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute left-[20px] top-[32px] h-[64px] w-[64px]">
      <img src={logo3d} alt="3DUTOPIA Logo" className="absolute inset-0 size-full object-contain" />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents left-[39.93px] top-[46px]">
      {/* Changed: OCULuS → 3DUTOPIA */}
      <p className="[word-break:break-word] absolute font-['Chivo:Black',sans-serif] font-black h-[36.931px] leading-[normal] left-[97.1px] text-[28px] text-white top-[46px] uppercase w-[200px] tracking-widest">3DUTOPIA</p>
      <Group10 />
    </div>
  );
}

const NAV_LINKS: { label: string; path: string; left: number; active?: boolean }[] = [
  { label: "Home", path: "/", left: 441, active: true },
  { label: "Praktikum", path: "/praktikum", left: 531 },
  { label: "Modul", path: "/modul", left: 665 },
  { label: "Komponen", path: "/komponen", left: 761 },
  { label: "About", path: "/about", left: 897 },
];

function Group13() {
  const navigate = useNavigate();
  return (
    <div className="[word-break:break-word] absolute contents leading-[normal] left-[441px] text-[18px] top-[52px] whitespace-nowrap">
      {NAV_LINKS.map((link) => (
        <p
          key={link.path}
          onClick={() => navigate(link.path)}
          className={`absolute top-[52px] cursor-pointer transition-colors hover:text-[#bffd44] ${
            link.active
              ? "font-['Chivo:Bold',sans-serif] font-bold text-[#bffd44]"
              : "font-['Chivo:Light',sans-serif] font-light text-white"
          }`}
          style={{ left: `${link.left}px`, zIndex: 40, pointerEvents: "auto" }}
        >
          {link.label}
        </p>
      ))}
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents left-[441px] top-[52px]">
      <Group13 />
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute h-[48px] left-[1351px] top-[40px] w-[48.491px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.4914 48">
        <g id="Group 1000001336">
          <circle cx="24" cy="24" fill="var(--fill-0, #D9D9D9)" fillOpacity="0.3" id="Ellipse 14" r="24" />
          <rect fill="var(--fill-0, #FB7943)" height="15.8112" id="Rectangle 15" rx="7.90562" width="15.8112" x="32.6801" y="6.16504" />
          <g id="Group 1000001335">
            <path d={svgPaths.p15758d00} id="Rectangle 13" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
            <path d={svgPaths.p2e382b80} id="Rectangle 14" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute left-[1263px] size-[48px] top-[40px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Group 1000001337">
          <circle cx="24" cy="24" fill="var(--fill-0, #D9D9D9)" fillOpacity="0.3" id="Ellipse 14" r="24" />
          <g id="Group 1000001348">
            <circle cx="23.8179" cy="18.3638" id="Oval" r="6.62065" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
            <path d={svgPaths.p3fe839e0} id="Path 200" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group17({ metricValue, metricDesc }: { metricValue: string, metricDesc: string }) {
  return (
    <div className="absolute left-[942.77px] top-[990px] flex items-center gap-5 text-white h-[76px] transition-all duration-500">
      <p className="font-['Chivo:Bold',sans-serif] font-bold text-[40px] whitespace-nowrap m-0 w-[100px] text-right">{metricValue}</p>
      <p className="font-['Chivo:Regular',sans-serif] font-normal text-[22px] w-[220px] leading-tight m-0">{metricDesc}</p>
    </div>
  );
}

const CAROUSEL_DATA = [
  { 
    id: 0, 
    title: 'Modul Pembelajaran', 
    imageSrc: imgImage44, 
    bg: 'transparent',
    centerImgClasses: 'absolute inset-0 size-full object-contain pointer-events-none drop-shadow-2xl scale-105 transition-transform duration-500',
    sideImgClasses: 'absolute inset-0 size-full object-contain pointer-events-none drop-shadow-lg scale-90 transition-transform duration-500',
    badgeText: 'MULAI MODUL PEMBELAJARAN \u00A0 \u2022 \u00A0',
    metricValue: '15+',
    metricDesc: 'Modul Praktikum Siap Pakai ',
    path: '/modul'
  },
  { 
    id: 1, 
    title: 'Komponen Mesin', 
    imageSrc: imgImage45, 
    bg: '#ffbf00',
    centerImgClasses: 'absolute inset-0 size-full object-contain pointer-events-none drop-shadow-2xl scale-100 transition-transform duration-500',
    sideImgClasses: 'absolute inset-0 size-full object-contain pointer-events-none drop-shadow-lg scale-75 transition-transform duration-500',
    badgeText: 'MULAI KOMPONEN MESIN \u00A0 \u2022 \u00A0',
    metricValue: '50+',
    metricDesc: 'Komponen Mesin 3D Interaktif ',
    path: '/komponen'
  },
  { 
    id: 2, 
    title: 'Simulasi Lab', 
    imageSrc: imgImage46, 
    bg: '#00cba0',
    centerImgClasses: 'absolute inset-0 size-full object-contain pointer-events-none drop-shadow-2xl scale-100 transition-transform duration-500',
    sideImgClasses: 'absolute inset-0 size-full object-contain pointer-events-none drop-shadow-lg scale-75 transition-transform duration-500',
    badgeText: 'MULAI SIMULASI LAB VIRTUAL \u00A0 \u2022 \u00A0',
    metricValue: '500+',
    metricDesc: 'Mahasiswa aktif di lab ini ',
    path: '/praktikum'
  }
];

function CenterSlot({ title, imageSrc, imgClasses }: { title: string; imageSrc: string; imgClasses: string }) {
  return (
    <div 
      className="absolute left-[393.83px] top-[819px] w-[206px] h-[270px]"
    >
      <div className="absolute inset-0 flex transition-all duration-500">
        <div className="-scale-y-100 flex-none rotate-180 size-full">
          <div className="backdrop-blur-[12px] border border-solid border-white h-full relative rounded-[14px] w-full transition-all duration-300" style={{ backgroundImage: "linear-gradient(268.609deg, rgba(172, 190, 241, 0.6) 9.7725%, rgba(205, 209, 220, 0.306) 94.771%)" }} />
        </div>
      </div>
      <p className="absolute left-0 w-full font-['Chivo:Regular',sans-serif] font-normal leading-[1.2] text-[26px] text-center text-white top-[186px] h-[72px] transition-all duration-500 flex items-center justify-center pointer-events-none">{title}</p>
      <div className="absolute inset-x-0 top-0 flex h-[186px] items-center justify-center pointer-events-none">
        <div className="-scale-y-100 flex-none rotate-180 size-full flex items-center justify-center transition-all duration-500 relative">
          <img alt="" className={imgClasses} src={imageSrc} />
        </div>
      </div>
    </div>
  );
}

function SideSlot({ imageSrc, bgColor, position, imgClasses }: { imageSrc: string; bgColor: string; position: 'left' | 'right'; imgClasses: string }) {
  const isLeft = position === 'left';
  const leftPos = isLeft ? '224.87px' : '660.4px';
  const topPos = isLeft ? '953.02px' : '949.12px';
  const imgLeft = isLeft ? '209.82px' : '645.35px';
  
  return (
    <div className="absolute contents">
      <div className="absolute flex h-[121.375px] items-center justify-center w-[109.912px] transition-all duration-500" style={{ left: leftPos, top: topPos }}>
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[121.375px] relative rounded-[12px] w-[109.912px] transition-colors duration-500" style={{ backgroundColor: bgColor === 'transparent' ? '#9b59b6' : bgColor }} />
        </div>
      </div>
      <div className="absolute flex items-center justify-center size-[140px] transition-all duration-500" style={{ left: imgLeft, top: topPos }}>
        <div className="-scale-y-100 flex-none rotate-[161.27deg] size-[117px] relative flex items-center justify-center">
          <img alt="" className={imgClasses} src={imageSrc} />
        </div>
      </div>
    </div>
  );
}

function ArrowButton({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="relative size-[50px] cursor-pointer transition-transform hover:scale-110 active:scale-95 rounded-[9px] border border-white/60 bg-white/10 backdrop-blur-sm flex items-center justify-center pointer-events-auto"
      style={{ zIndex: 60 }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        {direction === 'left' ? (
          <path d="M13 3L6 10L13 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M7 3L14 10L7 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

function Group24({ activeIndex, setActiveIndex }: { activeIndex: number, setActiveIndex: React.Dispatch<React.SetStateAction<number>> }) {
  const navigate = useNavigate();

  const handlePrev = () => setActiveIndex((prev) => (prev === 0 ? CAROUSEL_DATA.length - 1 : prev - 1));
  const handleNext = () => setActiveIndex((prev) => (prev === CAROUSEL_DATA.length - 1 ? 0 : prev + 1));

  const centerItem = CAROUSEL_DATA[activeIndex];
  const rightItem = CAROUSEL_DATA[(activeIndex + 1) % CAROUSEL_DATA.length];
  const leftItem = CAROUSEL_DATA[(activeIndex - 1 + CAROUSEL_DATA.length) % CAROUSEL_DATA.length];

  return (
    <div className="absolute left-0 top-0 w-full h-full" style={{ pointerEvents: 'none', zIndex: 5 }}>
      <div className="absolute flex h-[193px] items-center justify-center left-[103px] top-[929px] w-[1270px] pointer-events-none">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[193px] relative w-[1270px]">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1270 193">
              <foreignObject height="241" width="1318" x="-24" y="-24">
                <div style={{ backdropFilter: "blur(12px)", clipPath: "url(#bgblur_0_1_146_clip_path)", height: "100%", width: "100%" }} xmlns="http://www.w3.org/1999/xhtml" />
              </foreignObject>
              <path d={svgPaths.p259a0140} fill="url(#paint0_linear_1_146)" fillOpacity="0.6" id="Rectangle 12" stroke="url(#paint1_linear_1_146)" strokeWidth="2" data-figma-bg-blur-radius="24" />
              <defs>
                <clipPath id="bgblur_0_1_146_clip_path" transform="translate(24 24)">
                  <path d={svgPaths.p259a0140} />
                </clipPath>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_146" x1="1147.22" x2="80.1979" y1="25.226" y2="248.743">
                  <stop stopColor="#303440" />
                  <stop offset="1" stopColor="#393F4F" stopOpacity="0.51" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_146" x1="363.489" x2="361.731" y1="-29.76" y2="176.261">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <Group17 metricValue={centerItem.metricValue} metricDesc={centerItem.metricDesc} />
      
      <CenterSlot title={centerItem.title} imageSrc={centerItem.imageSrc} imgClasses={centerItem.centerImgClasses} />
      <SideSlot position="right" imageSrc={rightItem.imageSrc} bgColor={rightItem.bg} imgClasses={rightItem.sideImgClasses} />
      <SideSlot position="left" imageSrc={leftItem.imageSrc} bgColor={leftItem.bg} imgClasses={leftItem.sideImgClasses} />

      <div className="absolute left-[828.82px] top-[1007.02px]" style={{ zIndex: 60, pointerEvents: 'auto' }}>
        <ArrowButton direction="right" onClick={handleNext} />
      </div>
      <div className="absolute left-[138.82px] top-[1007.02px]" style={{ zIndex: 60, pointerEvents: 'auto' }}>
        <ArrowButton direction="left" onClick={handlePrev} />
      </div>
    </div>
  );
}

function OculusDesign() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="relative" style={{ width: `${DESIGN_W}px`, height: `${DESIGN_H}px` }} data-name="Design">
      <div className="absolute h-[1159px] left-0 shadow-[0px_30px_4px_0px_rgba(0,0,0,0.8)] top-0 w-[1440px]" style={{ backgroundImage: "linear-gradient(119.498deg, rgb(84, 38, 27) 1.3746%, rgb(0, 0, 2) 36.02%)" }} />
      <div className="absolute flex h-[1201.688px] items-center justify-center left-[-100px] top-[0.31px] w-[238px]">
        <div className="-rotate-90 flex-none">
          {/* Changed: Metaverse → 3DUTOPIA */}
          <p className="[word-break:break-word] font-['Chivo:Black',sans-serif] font-black leading-[normal] relative text-[200px] text-[rgba(45,45,45,0.3)] w-[1201.688px]">3DUTOPIA</p>
        </div>
      </div>
      <p className="[word-break:break-word] absolute font-['Monoton:Regular',sans-serif] leading-[normal] left-[248px] not-italic text-[#bffd44] text-[200px] top-[218px] uppercase whitespace-nowrap" style={{ zIndex: 2 }}>Future</p>
      <Group1 />
      <Group23 />
      <div className="absolute h-[259.676px] left-[5.27px] top-[887.01px] w-[519.352px]">
        <div className="absolute inset-[-177.14%_-88.57%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1439.35 1179.68">
            <g filter="url(#filter0_f_1_228)" id="Ellipse 6">
              <path d={svgPaths.p18cb1180} fill="var(--fill-0, #00A3FF)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1179.68" id="filter0_f_1_228" width="1439.35" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_1_228" stdDeviation="230" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[519.352px] items-center justify-center left-[1260.32px] top-[757.17px] w-[259.676px]">
        <div className="-rotate-90 flex-none">
          <div className="h-[259.676px] relative w-[519.352px]">
            <div className="absolute inset-[-177.14%_-88.57%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1439.35 1179.68">
                <g filter="url(#filter0_f_1_211)" id="Ellipse 12">
                  <path d={svgPaths.p18cb1180} fill="var(--fill-0, #BFFD44)" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1179.68" id="filter0_f_1_211" width="1439.35" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_1_211" stdDeviation="230" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[259.676px] items-center justify-center left-[-250.02px] top-[-15.03px] w-[519.352px]">
        <div className="flex-none rotate-180">
          <div className="h-[259.676px] relative w-[519.352px]">
            <div className="absolute inset-[-177.14%_-88.57%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1439.35 1179.68">
                <g filter="url(#filter0_f_1_173)" id="Ellipse 13">
                  <path d={svgPaths.p18cb1180} fill="var(--fill-0, #FB7A43)" fillOpacity="0.5" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1179.68" id="filter0_f_1_173" width="1439.35" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_1_173" stdDeviation="230" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute border border-[rgba(255,255,255,0.38)] border-solid h-[482.337px] left-[123px] rounded-[302px] top-[155.84px] w-[1193.697px]" style={{ zIndex: 1, WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)', maskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)' }} />
      <div className="absolute border border-[rgba(255,255,255,0.38)] border-solid h-[592.658px] left-[57px] rounded-[302px] top-[108px] w-[1325.907px]" style={{ zIndex: 1, WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)', maskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)' }} />
      <div className="absolute border border-[rgba(255,255,255,0.38)] border-solid h-[368.175px] left-[187px] rounded-[302px] top-[202.92px] w-[1066.192px]" style={{ zIndex: 1, WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)', maskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)' }} />
      <Group6 activeIndex={activeIndex} />
      <Group11 />
      <Group16 />
      <Group14 />
      <Group15 />
      <p className="-translate-x-full [word-break:break-word] absolute font-['Chivo:Regular',sans-serif] font-normal leading-[normal] left-[1437.37px] text-[30px] text-right text-white top-[-51.03px] whitespace-nowrap">spatialforge.id</p>
      <p className="[word-break:break-word] absolute font-['Saira_ExtraCondensed:Regular',sans-serif] leading-[normal] left-[248px] not-italic text-[#bffd44] text-[80px] top-[488px] whitespace-nowrap" style={{ zIndex: 10 }}>you need to</p>
      <p className="[word-break:break-word] absolute font-['Chivo:Regular',sans-serif] font-normal leading-[normal] left-[246px] text-[#bffd44] text-[110px] top-[617px] whitespace-nowrap" style={{ zIndex: 10 }}>Explore</p>
      <Group24 activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    </div>
  );
}

function HomePage() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      setScale(window.innerWidth / DESIGN_W);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <style>{`
        [class*="Chivo:Black"] { font-family: 'Chivo', sans-serif !important; font-weight: 900 !important; }
        [class*="Chivo:Regular"] { font-family: 'Chivo', sans-serif !important; font-weight: 400 !important; }
        [class*="Chivo:Bold"] { font-family: 'Chivo', sans-serif !important; font-weight: 700 !important; }
        [class*="Chivo:Light"] { font-family: 'Chivo', sans-serif !important; font-weight: 300 !important; }
        [class*="Monoton:Regular"] { font-family: 'Monoton', sans-serif !important; font-weight: 400 !important; }
        [class*="Saira_ExtraCondensed:Regular"] { font-family: 'Saira Extra Condensed', sans-serif !important; font-weight: 400 !important; }
      `}</style>
      {/* Fill the full viewport with the hero's dark gradient and vertically
          center the fixed-scale design so narrow/short screens show no black
          void below the scaled billboard. */}
      <div
        className="flex min-h-screen w-full items-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(119.498deg, rgb(84, 38, 27) 1.3746%, rgb(0, 0, 2) 36.02%)",
        }}
      >
        <div className="w-full overflow-hidden" style={{ height: `${DESIGN_H * scale}px` }}>
          <div
            style={{
              width: `${DESIGN_W}px`,
              height: `${DESIGN_H}px`,
              transformOrigin: "top left",
              transform: `scale(${scale})`,
            }}
          >
            <OculusDesign />
          </div>
        </div>
      </div>
    </>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full transform-gpu"
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/komponen" element={<PageTransition><KomponenPage /></PageTransition>} />
        <Route
          path="/komponen/:no"
          element={
            <Suspense
              fallback={
                <div
                  className="flex min-h-screen items-center justify-center bg-black text-[#BFFD44]"
                  style={{ fontFamily: "'Chivo', sans-serif" }}
                >
                  Memuat model 3D…
                </div>
              }
            >
              <PageTransition><KomponenDetailPage /></PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/praktikum"
          element={
            <PageTransition>
              <PlaceholderPage
                eyebrow="Virtual Lab"
                title="Praktikum"
                desc="Ruang praktikum virtual interaktif untuk menjalankan simulasi dan latihan mandiri. Modul ini sedang kami siapkan."
              />
            </PageTransition>
          }
        />
        <Route
          path="/modul"
          element={
            <PageTransition>
              <PlaceholderPage
                eyebrow="Materi Pembelajaran"
                title="Modul"
                desc="Kumpulan modul pembelajaran daring yang mendampingi setiap sesi praktikum. Kontennya sedang dalam penyusunan."
              />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <PlaceholderPage
                eyebrow="Tentang Kami"
                title="About"
                desc="3DUTOPIA SpatialForge — platform virtual praktikum untuk pendidikan vokasi. Informasi selengkapnya akan segera hadir."
              />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  );
}
