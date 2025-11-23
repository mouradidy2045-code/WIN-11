import React from 'react';
import { HardDrive, Monitor, Folder, File, Download, Image, Music, Video, ChevronRight, ArrowLeft } from 'lucide-react';

const SidebarItem = ({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs ${active ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'} cursor-default`}>
    {icon}
    <span>{label}</span>
  </div>
);

const FileItem = ({ icon, label, type, date }: { icon: any, label: string, type: string, date: string }) => (
    <tr className="hover:bg-white/5 cursor-default group">
        <td className="py-2 pl-2">
            <div className="flex items-center gap-2">
                {icon}
                <span className="text-sm text-white/90">{label}</span>
            </div>
        </td>
        <td className="text-xs text-white/50">{date}</td>
        <td className="text-xs text-white/50">{type}</td>
        <td className="text-xs text-white/50">12 KB</td>
    </tr>
)

export const ExplorerApp = () => {
  return (
    <div className="flex flex-col h-full bg-[#191919] text-white">
      {/* Ribbon */}
      <div className="h-10 bg-[#202020] border-b border-black/20 flex items-center px-4 gap-4 text-xs text-white/80">
        <button className="flex items-center gap-1.5 hover:bg-white/5 px-2 py-1 rounded disabled:opacity-50">
           <span className="text-sky-400 font-bold">+</span> New
        </button>
        <div className="w-[1px] h-4 bg-white/10" />
        <button className="hover:bg-white/5 px-2 py-1 rounded">Cut</button>
        <button className="hover:bg-white/5 px-2 py-1 rounded">Copy</button>
        <button className="hover:bg-white/5 px-2 py-1 rounded">Paste</button>
      </div>

      {/* Address Bar */}
      <div className="h-10 flex items-center px-3 gap-3 border-b border-white/5">
        <div className="flex gap-1">
            <button className="p-1 hover:bg-white/10 rounded"><ArrowLeft size={14} /></button>
            <button className="p-1 hover:bg-white/10 rounded rotate-180"><ArrowLeft size={14} /></button>
        </div>
        <div className="flex-1 bg-[#2b2b2b] border border-white/10 rounded flex items-center px-3 py-1 text-xs gap-2">
            <Monitor size={12} className="text-white/50" />
            <ChevronRight size={12} className="text-white/30" />
            <span>This PC</span>
            <ChevronRight size={12} className="text-white/30" />
            <span>Documents</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-[#191919] border-r border-white/5 p-2 flex flex-col gap-1 overflow-y-auto">
             <SidebarItem icon={<Monitor size={14} className="text-purple-400" />} label="This PC" active />
             <div className="pl-4 flex flex-col gap-1">
                <SidebarItem icon={<Monitor size={14} className="text-blue-400" />} label="Desktop" />
                <SidebarItem icon={<Download size={14} className="text-green-400" />} label="Downloads" />
                <SidebarItem icon={<File size={14} className="text-yellow-400" />} label="Documents" active />
                <SidebarItem icon={<Image size={14} className="text-purple-400" />} label="Pictures" />
                <SidebarItem icon={<Music size={14} className="text-pink-400" />} label="Music" />
                <SidebarItem icon={<Video size={14} className="text-orange-400" />} label="Videos" />
             </div>
             <div className="mt-4 border-t border-white/5 pt-2">
                 <SidebarItem icon={<HardDrive size={14} className="text-gray-400" />} label="Local Disk (C:)" />
                 <SidebarItem icon={<HardDrive size={14} className="text-gray-400" />} label="Data (D:)" />
             </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-[#151515] p-2">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="text-xs text-white/60 border-b border-white/5">
                    <th className="pb-2 pl-2 font-normal w-1/2">Name</th>
                    <th className="pb-2 font-normal w-1/6">Date modified</th>
                    <th className="pb-2 font-normal w-1/6">Type</th>
                    <th className="pb-2 font-normal w-1/6">Size</th>
                 </tr>
              </thead>
              <tbody>
                 <FileItem 
                    icon={<Folder size={16} className="text-yellow-400 fill-yellow-400/20" />} 
                    label="Project Alpha" type="File folder" date="10/24/2023 10:30 AM" 
                 />
                 <FileItem 
                    icon={<Folder size={16} className="text-yellow-400 fill-yellow-400/20" />} 
                    label="Financials" type="File folder" date="10/22/2023 2:15 PM" 
                 />
                 <FileItem 
                    icon={<File size={16} className="text-blue-400" />} 
                    label="Quarterly Report.docx" type="Word Document" date="10/20/2023 9:00 AM" 
                 />
                 <FileItem 
                    icon={<File size={16} className="text-green-400" />} 
                    label="Budget.xlsx" type="Excel Worksheet" date="10/19/2023 4:45 PM" 
                 />
                 <FileItem 
                    icon={<File size={16} className="text-orange-400" />} 
                    label="Presentation.pptx" type="PowerPoint Presentation" date="10/18/2023 11:20 AM" 
                 />
              </tbody>
           </table>
        </div>
      </div>

       <div className="h-6 bg-[#202020] border-t border-white/5 flex items-center px-3 text-[10px] text-white/50">
        <span>5 items</span>
        <div className="w-[1px] h-3 bg-white/10 mx-2" />
        <span>1 item selected</span>
      </div>
    </div>
  );
};
