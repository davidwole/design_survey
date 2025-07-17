import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";

export interface ImageData {
  id: number;
  url: string;
  title: string;
  description: string;
}

export interface RoomData {
  id: number;
  name: string;
  icon: string;
  count: number;
}

export interface AppData {
  selectedImages: ImageData[];
  selectedRooms: RoomData[];
  focusedRoom: RoomData | null;
  name: string;
  email: string;
  homeType: string;
  homeOwnership: string;
  roomStatus: string;
  timeframe: string;
  budget: string;
  zipCode: string;
  timestamp?: number; // Add timestamp to track when data was created
}

interface AppContextType extends AppData {
  setSelectedImages: (images: ImageData[]) => void;
  setSelectedRooms: (rooms: RoomData[]) => void;
  addSelectedImage: (image: ImageData) => void;
  removeSelectedImage: (imageId: number) => void;
  updateRoomCount: (roomId: number, count: number) => void;
  setFocusedRoom: (room: RoomData) => void;
  setHomeType: (type: string) => void;
  setName: (type: string) => void;
  setEmail: (type: string) => void;
  setHomeOwnership: (ownership: string) => void;
  setRoomStatus: (status: string) => void;
  setTimeframe: (timeframe: string) => void;
  setBudget: (budget: string) => void;
  setZipCode: (zipCode: string) => void;
  getAllData: () => AppData;
  clearAllData: () => void;
}

const defaultAppData: AppData = {
  selectedImages: [],
  selectedRooms: [],
  focusedRoom: null,
  name: "",
  email: "",
  homeType: "",
  homeOwnership: "",
  roomStatus: "",
  timeframe: "",
  budget: "",
  zipCode: "",
  timestamp: Date.now(),
};

const STORAGE_KEY = "interior_design_app_data";
const ONE_HOUR = 3 * 60 * 60 * 1000; // 1 hour in milliseconds

// Memory storage fallback for environments without localStorage
let memoryStorage: { [key: string]: string } = {};

const isDataExpired = (timestamp: number): boolean => {
  return Date.now() - timestamp > ONE_HOUR;
};

const getStoredData = (): AppData => {
  try {
    // Try localStorage first
    if (typeof window !== "undefined" && window.localStorage) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedData = JSON.parse(stored);

        // Check if data is expired
        if (parsedData.timestamp && isDataExpired(parsedData.timestamp)) {
          console.log("Data expired, clearing localStorage");
          localStorage.removeItem(STORAGE_KEY);
          return { ...defaultAppData, timestamp: Date.now() };
        }

        return { ...defaultAppData, ...parsedData };
      }
    }
  } catch (error) {
    console.warn("localStorage not available, using memory storage");
  }

  // Fallback to memory storage
  try {
    const stored = memoryStorage[STORAGE_KEY];
    if (stored) {
      const parsedData = JSON.parse(stored);

      // Check if data is expired
      if (parsedData.timestamp && isDataExpired(parsedData.timestamp)) {
        console.log("Data expired, clearing memory storage");
        delete memoryStorage[STORAGE_KEY];
        return { ...defaultAppData, timestamp: Date.now() };
      }

      return { ...defaultAppData, ...parsedData };
    }
  } catch (error) {
    console.warn("Error reading from memory storage");
  }

  return { ...defaultAppData, timestamp: Date.now() };
};

const saveData = (data: AppData) => {
  const dataToSave = JSON.stringify(data);

  try {
    // Try localStorage first
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, dataToSave);
      return;
    }
  } catch (error) {
    console.warn("localStorage not available, using memory storage");
  }

  // Fallback to memory storage
  memoryStorage[STORAGE_KEY] = dataToSave;
};

const clearStoredData = () => {
  try {
    // Clear localStorage
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.warn("Error clearing localStorage");
  }

  // Clear memory storage
  try {
    delete memoryStorage[STORAGE_KEY];
  } catch (error) {
    console.warn("Error clearing memory storage");
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [appData, setAppData] = useState<AppData>(() => getStoredData());

  // Auto-clear timer
  useEffect(() => {
    const checkAndClearExpiredData = () => {
      if (appData.timestamp && isDataExpired(appData.timestamp)) {
        console.log("Auto-clearing expired data");
        clearStoredData();
        setAppData({ ...defaultAppData, timestamp: Date.now() });
      }
    };

    // Check immediately
    checkAndClearExpiredData();

    // Set up interval to check every minute
    const interval = setInterval(checkAndClearExpiredData, 60000);

    // Set up timeout to clear after exactly one hour
    const timeout = setTimeout(() => {
      console.log("One hour timeout reached, clearing data");
      clearStoredData();
      setAppData({ ...defaultAppData, timestamp: Date.now() });
    }, ONE_HOUR);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [appData.timestamp]);

  // Save to storage whenever data changes
  useEffect(() => {
    saveData(appData);
  }, [appData]);

  const updateAppData = useCallback((updates: Partial<AppData>) => {
    setAppData((prev) => ({
      ...prev,
      ...updates,
      timestamp: prev.timestamp || Date.now(), // Preserve original timestamp
    }));
  }, []);

  const setSelectedImages = useCallback(
    (images: ImageData[]) => {
      updateAppData({ selectedImages: images });
    },
    [updateAppData]
  );

  const setSelectedRooms = useCallback(
    (rooms: RoomData[]) => {
      updateAppData({ selectedRooms: rooms });
    },
    [updateAppData]
  );

  const addSelectedImage = useCallback((image: ImageData) => {
    setAppData((prev) => {
      const exists = prev.selectedImages.find((img) => img.id === image.id);
      if (exists) return prev;
      const newImages = [...prev.selectedImages, image];
      return {
        ...prev,
        selectedImages: newImages,
        timestamp: prev.timestamp || Date.now(),
      };
    });
  }, []);

  const removeSelectedImage = useCallback((imageId: number) => {
    setAppData((prev) => ({
      ...prev,
      selectedImages: prev.selectedImages.filter((img) => img.id !== imageId),
      timestamp: prev.timestamp || Date.now(),
    }));
  }, []);

  const updateRoomCount = useCallback((roomId: number, count: number) => {
    const roomsData = [
      { id: 1, name: "Living Room", icon: "🛋️" },
      { id: 2, name: "Bedroom", icon: "🛏️" },
      { id: 3, name: "Kitchen", icon: "🍳" },
      { id: 4, name: "Bathroom", icon: "🛁" },
      { id: 5, name: "Dining Room", icon: "🍽️" },
      { id: 6, name: "Office", icon: "💻" },
      { id: 7, name: "Garage", icon: "🚗" },
      { id: 8, name: "Basement", icon: "🏠" },
      { id: 9, name: "Attic", icon: "📦" },
      { id: 10, name: "Laundry Room", icon: "🧺" },
      { id: 11, name: "Guest Room", icon: "🛌" },
      { id: 12, name: "Not Sure Yet", icon: "❓" },
      { id: 13, name: "Other", icon: "☝️" },
    ];

    setAppData((prev) => {
      const filtered = prev.selectedRooms.filter((room) => room.id !== roomId);
      let newSelectedRooms = filtered;

      if (count > 0) {
        const roomInfo = roomsData.find((room) => room.id === roomId);
        if (roomInfo) {
          newSelectedRooms = [...filtered, { ...roomInfo, count }];
        }
      }

      return {
        ...prev,
        selectedRooms: newSelectedRooms,
        timestamp: prev.timestamp || Date.now(),
      };
    });
  }, []);

  const setFocusedRoom = useCallback(
    (room: RoomData) => {
      updateAppData({ focusedRoom: room });
    },
    [updateAppData]
  );

  const setName = useCallback(
    (name: string) => {
      updateAppData({ name });
    },
    [updateAppData]
  );

  const setEmail = useCallback(
    (email: string) => {
      updateAppData({ email });
    },
    [updateAppData]
  );

  const setHomeType = useCallback(
    (type: string) => {
      updateAppData({ homeType: type });
    },
    [updateAppData]
  );

  const setHomeOwnership = useCallback(
    (ownership: string) => {
      updateAppData({ homeOwnership: ownership });
    },
    [updateAppData]
  );

  const setRoomStatus = useCallback(
    (status: string) => {
      updateAppData({ roomStatus: status });
    },
    [updateAppData]
  );

  const setTimeframe = useCallback(
    (timeframe: string) => {
      updateAppData({ timeframe });
    },
    [updateAppData]
  );

  const setBudget = useCallback(
    (budget: string) => {
      updateAppData({ budget });
    },
    [updateAppData]
  );

  const setZipCode = useCallback(
    (zipCode: string) => {
      updateAppData({ zipCode });
    },
    [updateAppData]
  );

  const getAllData = useCallback(() => {
    return appData;
  }, [appData]);

  const clearAllData = useCallback(() => {
    console.log("Manually clearing all data");
    clearStoredData();
    setAppData({ ...defaultAppData, timestamp: Date.now() });
  }, []);

  const value: AppContextType = {
    ...appData,
    setSelectedImages,
    setSelectedRooms,
    addSelectedImage,
    removeSelectedImage,
    updateRoomCount,
    setFocusedRoom,
    setName,
    setEmail,
    setHomeType,
    setHomeOwnership,
    setRoomStatus,
    setTimeframe,
    setBudget,
    setZipCode,
    getAllData,
    clearAllData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
