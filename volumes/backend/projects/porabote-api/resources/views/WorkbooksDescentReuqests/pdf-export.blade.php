<table style=" border-bottom: 2px solid #c3c3c3; border-top: 0px solid #616361; width: 100%; border-collapse: collapse;">
    <tr>
        <td style="width: 40%;  border-right: 0px solid #b1b1b3; padding: 20px 0px 15px 15px;">
            <p style="font-size: 13pt; color: #202022;">ТОО Шахтбау Казахстан</p>
            <p style="font-size: 10pt; color: #5a5a5c;"><i>(TOO Schachtbau Kasachstan)</i></p>
            <br>
            <p style="font-size: 12pt; color: #1d1a1a;">{{$data->shift_day?->name}}</p>
            <p style="font-size: 10pt; color: #5a5a5c;"><i>(Schichtbefehle)</i></p>
        </td>
        <td style="width: 60%; text-align: center;">
            <p style="font-size: 22pt; color: #303032;">Заявка на спуск #{{$data->id}}</p>
            <p style="font-size: 10pt; color: #5a5a5c;"><i>(Antrag auf abstieg)</i></p>
            <p style="font-size: 15pt; color: #303032;">от {{ Carbon\Carbon::parse($data->date)->format('d.m.Y') }}</p>
        </td>

    </tr>
</table>
<table style="border-bottom: 0.5px solid #afafaf; width: 400px; border-collapse: collapse; margin-bottom: 20px;">
    <tr>
        <td style="padding: 20px 0px 5px 25px;">
            <p style="font-size: 13pt; color: #04487a;">Участок</p>
        </td>
    </tr>
</table>

<table style="width: 100%; border-collapse: collapse;">
    <tr>
        <td style="width: 30px; height: 30px; padding: 0px 0px 20px 30px;">
            <p>{{$data->site->name_ru}}</p>
            <p style="font-size: 10pt; color: #5a5a5c;"><i>({{$data->site->name_de}})</i></p>
        </td>

    </tr>
</table>

<table style="border-bottom: 0.5px solid #afafaf; width: 400px; border-collapse: collapse; margin-bottom: 20px;">
    <tr>
        <td style="width: 40%; padding: 10px 0px 5px 25px;">
            <p style="font-size: 13pt; color: #04487a;">Список оборудования/материалов</p>
        </td>
    </tr>
</table>

<table style="width: 100%;">
    <tbody>
    <tr>
        <td style="width: 20px;"></td>
        <td style="width: 60px; border-bottom: 0px solid #1d1a1a; font-size: 9pt;"><b>Наименование</b></td>
        <td style="width: 260px; border-bottom: 0px solid #1d1a1a; font-size: 9pt;"><b>Комментарий</b></td>
        <td style="width: 40px; border-bottom: 0px solid #1d1a1a; font-size: 9pt; text-align: center;"><b>Горизонт</b></td>
        <td style="width: 40px; border-bottom: 0px solid #1d1a1a; font-size: 9pt; text-align: center;"><b>Заявлено</b></td>
        <td style="width: 10px;"></td>
        <td style="width: 60px; border-bottom: 0px solid #1d1a1a; font-size: 9pt; text-align: center;"><b>Выполнено</b></td>
    </tr>
    @php($count=1)
    @foreach ($data->orders as $order)
        <tr>
            <td style="width: 20px; height: 40px; text-align: center; font-size: 9pt;">{{$count}}</td>
            <td style="width: 60px; height: 40px; border-bottom: 0.5px dashed #cccaca; font-size: 9pt;"><p>{{$order->order_type?->name_ru}}</p><p style="font-size: 8pt;">({{$order->operation->name_ru}})</p></td>
            <td style="width: 260px; height: 40px; border-bottom: 0.5px dashed #cccaca; font-size: 9pt;">{{$order->desc}}</td>
            <td style="width: 40px; height: 40px; border-bottom: 0.5px dashed #cccaca; font-size: 9pt; text-align: center;"><p>{{$order->horizon?->name_ru}}</p></td>
            <td style="width: 40px; height: 40px; border-bottom: 0.5px dashed #cccaca; font-size: 9pt; text-align: center;"><p>{{$order->quantity_request}}</p></td>
            <td style="width: 10px; height: 40px;"></td>
            <td style="width: 60px; height: 40px; border-bottom: 0.5px solid #cccaca; font-size: 9pt; text-align: center;">{{$order->quantity_received}}</td>
        </tr>
        @php($count++)
    @endforeach
    </tbody>
</table>
<br>
<br>
<br>

<table style="border-bottom: 0px solid #afafaf; width: 100%; border-collapse: collapse; margin-left: 30px;">
    <tr>
        <td style="width: 50%;">
            <p style="font-size: 9pt;"><b>Заявитель:</b></p>
        </td>
        <td style="width: 50%;">
            <p style="font-size: 9pt;"><b>Исполнитель:</b></p>
        </td>
    </tr>
    <tr>
        <td style="width: 50%; padding: 25px 0px 20px 5px;">
            <p style="font-size: 9pt; color: #1d1a1a;">{{$data->user->first_name}} {{$data->user->sur_name}}</p>
        </td>
        <td style="width: 50%; padding: 25px 0px 20px 5px;">
            <p style="font-size: 9pt; color: #1d1a1a;">__________________________________</p>
        </td>
    </tr>
</table>
