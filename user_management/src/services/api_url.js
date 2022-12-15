export const API_BASE_URL= "http://zewscalender-001-site1.btempurl.com/api";
export const IMG_BASE_URL = "http://zewscalender-001-site1.btempurl.com/";


export const API_ENDPOINTS_ADV = {
  add_adv: "/Advertisement/Add-Advertisement",
  edit_adv: "/Advertisement/Update-Advertisement",
  get_id_adv:"/Advertisement/Get-Advertisement-By-Id",
  getall_adv: "/Advertisement/Get-All-Advertisements",
  delete_adv:"/Advertisement/Delete-Advertisement",
  post_disable_adv:"/Advertisement/Disable-Ad",

 };

 export const API_ENDPOINTS_ORG ={
    get_org:"/Organization",
    get_id_org:"/Organization/Get-Organization-By-Id",
    get_all_org:"/Organization/Get-All-Organization",
    add_org:"Organization/Add-Organization",
    edit_org:"/Organization/Update-Organization",
    delete_org:"Organization/Delete-Organization ",

 };

 export const API_ENDPOINTS_Files ={
   upload_file:"File/File-Uploaded",
   update_file:"/File/Update-File-Upload",
   get_id_file:"/File/Get-File-By-Id",
   get_all_files:"/File/Get-All-Files",
   delete_file:"File/Delete-File ",

};