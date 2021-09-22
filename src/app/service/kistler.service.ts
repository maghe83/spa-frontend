import { Injectable } from '@angular/core';
import { KistlerRecord } from '../model/kistler/KistlerRecord';

@Injectable({
  providedIn: 'root',
})
export class KistlerService {
  private kistlerdata: KistlerRecord[] = [
    {
      id: 1,
      axlesCount: 4,
      direction: 1,
      grossWeightInKg: 50000,
      jsonMessage: 'test message 1',
      kistlerDeviceId: 'device1',
      measurementDateTimeInMills: 6631179193202,
      vehicleLengthInM: 15,
      velocityInKmH: 50,
    },
    {
      id: 2,
      axlesCount: 4,
      direction: 1,
      grossWeightInKg: 60000,
      jsonMessage: 'test message 2',
      kistlerDeviceId: 'device2',
      measurementDateTimeInMills: 5631179193243,
      vehicleLengthInM: 13,
      velocityInKmH: 60,
    },
    {
      id: 3,
      axlesCount: 4,
      direction: 2,
      grossWeightInKg: 60000,
      jsonMessage: 'test message 3',
      kistlerDeviceId: 'device3',
      measurementDateTimeInMills: 4631179193256,
      vehicleLengthInM: 13,
      velocityInKmH: 80,
    },
    {
      id: 4,
      axlesCount: 6,
      direction: 2,
      grossWeightInKg: 70000,
      jsonMessage: 'test message 4',
      kistlerDeviceId: 'device4',
      measurementDateTimeInMills: 3631179193250,
      vehicleLengthInM: 17,
      velocityInKmH: 80,
    },
    {
      id: 5,
      axlesCount: 6,
      direction: 1,
      grossWeightInKg: 70000,
      jsonMessage: 'test message 5',
      kistlerDeviceId: 'device5',
      measurementDateTimeInMills: 2631179193550,
      vehicleLengthInM: 17,
      velocityInKmH: 80,
    },
    {
      id: 6,
      axlesCount: 6,
      direction: 1,
      grossWeightInKg: 80000,
      jsonMessage: 'test message 6',
      kistlerDeviceId: 'device6',
      measurementDateTimeInMills: 7631179193550,
      vehicleLengthInM: 17,
      velocityInKmH: 50,
    },
    {
      id: 7,
      axlesCount: 6,
      direction: 1,
      grossWeightInKg: 60000,
      jsonMessage: 'test message 7',
      kistlerDeviceId: 'device7',
      measurementDateTimeInMills: 1631179193550,
      vehicleLengthInM: 17,
      velocityInKmH: 50,
    },
  ];

  constructor() {}

  public getKistlerDataSource(): KistlerRecord[] {
    return this.kistlerdata;
  }
}
