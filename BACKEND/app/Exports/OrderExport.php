<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use App\Models\Order;

class OrderExport implements FromCollection,WithHeadings,ShouldAutoSize, WithEvents
{
    /**
    * @return \Illuminate\Support\Collection
    */


    public function __construct()
    {
    }

    public function collection()
    {
       return  Order::get();

    }

    public function headings(): array
    {
        return [
            'id',
            'name'
        ];
    }
    // public function map($bill): array
    // {
    //     return [
    //         $user->id,
    //         $user->name,
    //     ];
    // }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class    => function(AfterSheet $event) {
                $cellRange = 'A1:W1'; // All headers
                $event->sheet->getDelegate()->getStyle($cellRange)->getFont()->setSize(14);
            },
        ];
    }
}
