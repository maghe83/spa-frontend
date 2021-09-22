export interface KistlerRecord {
  id: number; //long
  grossWeightInKg: number; //double
  kistlerDeviceId: string;
  measurementDateTimeInMills: number; //timestamp
  velocityInKmH: number; //double
  direction: number; //int
  vehicleLengthInM: number; //double
  axlesCount: number; //int
  jsonMessage: string;
}
