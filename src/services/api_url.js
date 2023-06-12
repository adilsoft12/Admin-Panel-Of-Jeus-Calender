export const API_BASE_URL = "http://localuser02-001-site4.etempurl.com/api";
export const IMG_BASE_URL = "http://localuser02-001-site4.etempurl.com/";

export const API_ENDPOINTS_ADV = {
  add_adv: "/Advertisement/Add-Advertisement",
  edit_adv: "/Advertisement/Update-Advertisement",
  get_id_adv: "/Advertisement/Get-Advertisement-By-Id",
  getall_adv: "/Advertisement/Get-All-Advertisements",
  delete_adv: "/Advertisement/Delete-Advertisement",
  post_disable_adv: "/Advertisement/Disable-Ad",
};

export const API_ENDPOINTS_ORG = {
  get_org: "/Organization",
  get_id_org: "/Organization/Get-Organization-By-Id",
  get_all_org: "/Organization/Get-All-Organization",
  add_org: "Organization/Add-Organization",
  edit_org: "/Organization/Update-Organization",
  delete_org: "Organization/Delete-Organization ",
};

export const API_ENDPOINTS_Files = {
  upload_file: "File/File-Uploaded",
  update_file: "/File/Update-File-Upload",
  get_id_file: "/File/Get-File-By-Id",
  get_all_files: "/File/Get-All-Files",
  delete_file: "File/Delete-File ",
};

export const API_ENDPOINTS_Event = {
  upload_file: "/ReligiousEvent/add",
  update_file: "/ReligiousEvent/edit",
  get_id_file: "/ReligiousEvent/GetBy-Id",
  get_all_files: "/ReligiousEvent/GetAll",
  delete_file: "/ReligiousEvent/Delete ",
};

export const API_ENDPOINTS_Contact = {
  upload_file: "/Contact/Add",
  update_file: "/Contact/Edit",
  get_id_file: "/api/Contact/GetBy-ID",
  get_all_files: "/Contact/GetAll",
  delete_file: "Contact/Delete?id=1 ",
};

export const API_ENDPOINTS_Banner = {
  Get_all_Banner: "/Banner/GetAll",
  Add_Banner: "Add-Banner",
};
export const API_ENDPOINTS_UpcomingEvent = {
  Add_Upcoming_Event: "/UpcomingEvent/Add",
  Edit_Upcoming_Event: "/UpcomingEvent/edit",
  get_id_event: "/UpcomingEvent/GetBy-Id",
  get_all_event: "/UpcomingEvent/GetAll",
  delete_event: "/UpcomingEvent/Delete ",
};
