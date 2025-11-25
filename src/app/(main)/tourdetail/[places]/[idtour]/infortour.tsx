import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getImageUrl } from "@/utils/imageUrl";
import { TourScheduleResponse } from "@/api/tourApi";

export default function TourPage({ data }: { data: any }) {
  const tour = data;

  if (!tour) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      {/* Tour Header Images */}
      <div className="grid grid-cols-1 gap-4">
        <img
          src={`http://localhost:8088/api/tours/images/${tour?.avatar}`}
          alt={tour.name || "tour image"}
          className="w-full h-80 object-cover rounded-2xl shadow"
        />
        {tour.images && tour.images.length > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {tour.images.slice(1, 5).map((img: string, index: number) => (
              <img
                key={index}
                src={`http://localhost:8088/api/tours/images/${img}`}
                alt={`${tour.name} ${index + 1}`}
                className="rounded-xl h-28 w-full object-cover"
              />
            ))}
          </div>
        )}
      </div>

      {/* Thông Tin Tour */}
      <Card>
        <CardContent className="space-y-4 p-4">
          <h2 className="text-xl font-bold text-blue-700">Thông Tin Tour</h2>
          {tour.tourDetail ? (
            <div dangerouslySetInnerHTML={{ __html: tour.tourDetail }} />
          ) : (
            <p>
              Nếu bạn đang tìm kiếm một hành trình vừa có cảnh sắc thiên nhiên
              hùng vĩ, vừa có nét cổ kính của văn hóa, thì tour du lịch này
              chính là lựa chọn hoàn hảo.
            </p>
          )}

          {tour.imageUrl && (
            <img
              src={getImageUrl(tour.imageUrl)}
              alt={tour.name}
              className="rounded-xl shadow-md w-full h-64 object-cover"
            />
          )}
          <Button className="bg-purple-600 hover:bg-purple-700">
            Xem chi tiết
          </Button>
        </CardContent>
      </Card>

      {/* Lịch Trình Tour */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-blue-700">Lịch Trình Tour</h2>

        {tour.schedules?.map(
          (schedule: TourScheduleResponse, index: number) => (
            <Card key={schedule.id} className="border-l-4 border-purple-600">
              <CardContent className="p-4 space-y-3">
                <h3 className="text-lg font-semibold text-purple-700">
                  {schedule.title}
                </h3>
                <div
                  dangerouslySetInnerHTML={{ __html: schedule.description }}
                />
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
