import React, { useState } from "react";
import EditSlotSettingComponent from "./EditSlotSettingComponent";
import ShowAddedSlotComponent from "./ShowAddedSlotComponent";

const AddedSlotComponent = ({
    onlineSlotData,
    getOnlineSlotDetailForDoctorForPerticularDate,
    selectedSlotDate,
    doctorDetails,
}) => {
    const [editSlotSetting, setEditSlotSetting] = useState(false);

    return (
        <>
            {editSlotSetting ? (
                <EditSlotSettingComponent
                    setEditSlotSetting={setEditSlotSetting}
                    getOnlineSlotDetailForDoctorForPerticularDate={
                        getOnlineSlotDetailForDoctorForPerticularDate
                    }
                    selectedSlotDate={selectedSlotDate}
                    onlineSlotData={onlineSlotData}
                    doctorDetails={doctorDetails}
                />
            ) : (
                <ShowAddedSlotComponent
                    onlineSlotData={onlineSlotData}
                    setEditSlotSetting={setEditSlotSetting}
                    doctorDetails={doctorDetails}
                />
            )}
        </>
    );
};

export default AddedSlotComponent;
