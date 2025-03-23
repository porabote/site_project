<table style="border-collapse: collapse;">
    <tr>
        <td style="width: 200px;  border-radius: 15px; border-left: 1px solid #60c5a0; border-top: 1px solid #60c5a0; border-bottom: 1px solid #60c5a0; background-color: #fff; padding: 5px 20px;">
            <p style="font-size: 10pt; color: #0c060e;">ТОО Шахтбау Казахстан</p>
            <p style="font-size: 8pt; color: #5a5a5c;"><i>(TOO Schachtbau Kasachstan)</i></p>
        </td>
        <td style="width: 50px; border-radius: 15px; border-right: 1px solid #60c5a0; border-top: 1px solid #60c5a0; border-bottom: 1px solid #60c5a0; background-color: #fff; padding: 5px 10px 5px 0px;">

            <img src="/files/images/sk_pr_logo.jpg" width="50" height="50"/>


        </td>
        <td style="width: 430px; border-bottom: 1px solid #fff; background-color: #fff; padding: 5px 20px;">
            <p style="font-size: 11pt; color: #3c3c3c;"><b>Отчет горного мастера #{{$data->id}}
                    от {{ Carbon\Carbon::parse($data->date)->format('d.m.Y') }}</b></p>
            <p style="font-size: 9pt; color: #5a5a5c;"><i>(Bericht des Bergbauvorarbeiters)</i></p>
        </td>
    </tr>
</table>
<div style="width: 100%;">
    <table style="border-collapse: collapse; margin-top: 10px; width: 100%; border-top: 1px solid #959897;">
        <tr>
            <td style="border-color: #959897; border-radius: 15px; border: 0px solid; background-color: #fff; padding: 5px 20px; width: 250px;">
                <p style="font-size: 10pt; color: #0c060e;"><b>{{$data->shift_day->name}}</b></p>
                <p style="font-size: 8pt; color: #5a5a5c;"><i>(Ändern)</i></p>
            </td>
            <td style="border-color: #60c5a0; border-radius: 15px; border: 0px solid; background-color: #fff; padding: 5px 20px; width: 170px; text-align: right;">
                <p style="font-size: 10pt; color: #0c060e;">План на смену(м<sup>2</sup>)</p>
                <p style="font-size: 8pt; color: #5a5a5c;"><i>(Schichtplan)</i></p>
            </td>
            <td style="border-color: #60c5a0; border-radius: 15px; border-bottom: 1px solid; background-color: #fff; padding: 5px 20px;">
                <p style="font-size: 15pt; color: #0c060e;">{{$data->plan_value}}</p>
            </td>
            <td style="border-color: #60c5a0; border-radius: 15px; border: 0px solid; background-color: #fff; padding: 5px 20px; width: 170px; text-align: right;">
                <p style="font-size: 10pt; color: #0c060e;">Факт на смену(м<sup>2</sup>)</p>
                <p style="font-size: 8pt; color: #5a5a5c;"><i>(Eigentlich zu ersetzen)</i></p>
            </td>
            <td style="border-color: #60c5a0; border-radius: 15px; border-bottom: 1px solid; background-color: #fff; padding: 5px 20px;">
                <p style="font-size: 15pt; color: #0c060e;">{{$data->plan_value_fact}}</p>
            </td>
        </tr>
    </table>
</div>

<div>
    <table style="width: 100%; padding-top: 10px;">
        <tr>
            <td style="width: 270px; color: #3e5667; border: 0px solid #9d9d9f; height: 40px; vertical-align: top; padding: 0px 5px; font-size: 9pt; text-align: right;">
                <p style="font-size: 10pt; color: #0c060e;">Причина отклонения от плана</p>
                <p style="font-size: 8pt; color: #5a5a5c;"><i>(Grund der Planabweichung)</i></p>
            </td>
            <td style="border: 0.5px solid #9d9d9f; height: 40px; vertical-align: top; padding: 5px; font-size: 11px;">
                <p>{{$data->downtime_reason}}</p>
            </td>
        </tr>
    </table>
</div>

<div style="width: 100%;">
    <table style=" margin-top: 5px; width: 100%; border-spacing: 5px;">
        <tr style="border-bottom: 0.5px solid #60c5a0; background-color: #fff;">
            <td colspan="3" style="padding: 5px 5px; width: 100%; text-align: left;">
                <p style="font-size: 10pt; color: #0c060e;"><b>Локации / Standorte</b></p>
            </td>
        </tr>
        <tr style="border-bottom: 0.5px solid #60c5a0; background-color: #fff; ">
            <td style="padding: 5px 10px; border-bottom: 1px solid #959897; width: 205px;">
                <p style="font-size: 8pt; color: #0c060e;">Участок (Handlung)</p>
            </td>
            <td style="padding: 5px 10px; border-bottom: 1px solid #959897; width: 130px;">
                <p style="font-size: 8pt; color: #0c060e;">Горизонт (Horizont)</p>
            </td>
            <td style="padding: 5px 10px; border-bottom: 1px solid #959897; width: 250px;">
                <p style="font-size: 8pt; color: #0c060e;">Объект (Objekt)</p>
            </td>
        </tr>
    </table>
</div>

<div style="width: 100%;">
    <table style=" margin-top: 0px; width: 100%;">
        <tr style="border-bottom: 0.5px solid #60c5a0; background-color: #fff;">
            <td style="padding: 5px 10px; border: 1px solid #959897; width: 155px;">
                <p style="font-size: 8pt; color: #3a3c3a; font-weight: bold;">{{$data->site->name_ru}}</p>
            </td>
            <td style="padding: 5px 10px; border: 1px solid #959897; width: 115px;">
                <p style="font-size: 8pt; color: #3a3c3a; font-weight: bold;">{{$data->horizon?->name_ru}}</p>
            </td>
            <td style="padding: 5px 10px; border: 1px solid #959897; width: 290px;">
                <p style="font-size: 8pt; color: #3a3c3a; font-weight: bold;">{{$data->object?->name_ru}}</p>
            </td>
        </tr>
    </table>
</div>

<div style="width: 100%;">
    <table style=" margin-top: 15px; width: 100%; border-spacing: 5px;">
        <tr style="border-bottom: 0.5px solid #60c5a0; background-color: #fff;">
            <td colspan="4" style="padding: 5px 5px; width: 100%; text-align: center;">
                <p style="font-size: 10pt; color: #0c060e;"><b>Выполненные работы / Abgeschlossene Arbeit</b></p>
            </td>
        </tr>
    </table>
</div>
<div style="width: 100%;">
    <table style=" margin-top: 5px; width: 100%; border-spacing: 5px;">
        <tr>
            <td style="padding: 5px 10px; border: 1px solid #959897; width: 50px; text-align: center;">
                <p style="font-size: 8pt; color: #0c060e;">#</p>
            </td>
            <td style="padding: 5px 10px; border-bottom: 1px solid #959897; width: 200px;">
                <p style="font-size: 8pt; color: #0c060e;">Наименование цикла</p>
                <p style="font-size: 7pt; color: #5a5a5c;"><i>(Zyklusname)</i></p>
            </td>
            <td style="padding: 5px 10px; border-bottom: 1px solid #959897; width: 130px;">
                <p style="font-size: 8pt; color: #0c060e;">Период времени</p>
                <p style="font-size: 7pt; color: #5a5a5c;"><i>(Zeitraum)</i></p>
            </td>
            <td style="padding: 5px 10px; border-bottom: 1px solid #959897;">
                <p style="font-size: 8pt; color: #0c060e;">Описание выполненных работ </p>
                <p style="font-size: 7pt; color: #5a5a5c;"><i>(Beschreibung der durchgeführten Arbeiten)</i></p>
            </td>
        </tr>
    </table>
</div>

@php($count_w=1)
@foreach ($data->works_completed as $work)

    <div style="width: 100%;">
        <table style="border-collapse: separate; width: 100%;">
            <tr>
                <td style="padding: 5px 10px;  width: 50px; border-bottom: 0.5px solid #eaeaea; vertical-align: top; text-align: center;">
                    <p style="font-size: 8pt; color: #0c060e;">{{$count_w}}</p>
                </td>
                <td style="padding: 5px 10px; width: 200px; border-bottom: 0.5px solid #eaeaea; vertical-align: top;">
                    <p style="font-size: 8pt; color: #0c060e;">
                        @if (!empty($work->param))
                            {{$work->param->name_ru}}
                        @else
                            {{$work->name_ru}}
                        @endif
                    </p>
                    <p style="font-size: 7pt; color: #5a5a5c;"> / <i>
                            @if (!empty($work->param))
                                {{$work->param->name_de}}
                            @else
                                {{$work->name_de}}
                            @endif
                        </i></p>
                </td>
                <td style="padding: 5px 10px; width: 130px; border-bottom: 0.5px solid #eaeaea; vertical-align: top;">
                    <p style="font-size: 8pt; color: #0c060e;">{{ Carbon\Carbon::parse($work->time_from)->format('H:i') }}
                        - {{ Carbon\Carbon::parse($work->time_to)->format('H:i') }}</p>
                </td>
                <td style="padding: 5px 10px; border-bottom: 0.5px solid #eaeaea; vertical-align: top;">
                    <p style="font-size: 8pt; color: #0c060e;">{{ $work->value }}</p>
                </td>
            </tr>
        </table>
    </div>

    @php($count_w++)
@endforeach



<div style="width: 100%;">
    <table style=" margin-top: 15px; width: 100%; border-spacing: 5px;">
        <tr style="border-bottom: 0.5px solid #60c5a0; background-color: #fff;">
            <td colspan="4" style="padding: 5px 5px; width: 100%; text-align: left;">
                <p style="font-size: 10pt; color: #0c060e;"><b>Простой / Stillstand</b></p>
            </td>
        </tr>
    </table>
</div>
<div style="width: 100%;">
    <table style=" margin-top: 5px; width: 100%; border-spacing: 5px;">
        <tr>
            <td style="padding: 5px 10px; border: 1px solid #959897; width: 50px; text-align: center;">
                <p style="font-size: 8pt; color: #0c060e;">#</p>
            </td>
            <td style="padding: 5px 10px; border-bottom: 1px solid #959897; width: 200px;">
                <p style="font-size: 8pt; color: #0c060e;">Наименование цикла</p>
                <p style="font-size: 7pt; color: #5a5a5c;"><i>(Zyklusname)</i></p>
            </td>
            <td style="padding: 5px 10px; border-bottom: 1px solid #959897; width: 130px;">
                <p style="font-size: 8pt; color: #0c060e;">Время простоя</p>
                <p style="font-size: 7pt; color: #5a5a5c;"><i>(Zeitraum)</i></p>
            </td>
            <td style="padding: 5px 10px; border-bottom: 1px solid #959897;">
                <p style="font-size: 8pt; color: #0c060e;">Причина простоя </p>
                <p style="font-size: 7pt; color: #5a5a5c;"><i>(Grunt)</i></p>
            </td>
        </tr>
    </table>
</div>

@php($count_p=1)
@foreach ($data->works_not_completed as $key =>  $workNotComplete)

    <div style="width: 100%;">
        <table style="border-collapse: separate; width: 100%;">
            <tr>
                <td style="padding: 5px 10px; border-bottom: 0.5px solid #eaeaea; width: 50px; vertical-align: top; text-align: center;">
                    <p style="font-size: 8pt; color: #0c060e;">{{++$key}}</p>
                </td>
                <td style="padding: 5px 10px; border-bottom: 0.5px solid #eaeaea; width: 200px; vertical-align: top;">
                    <p style="font-size: 8pt; color: #0c060e;">{{ $workNotComplete->name_ru }}</p>
                    <p style="font-size: 7pt; color: #5a5a5c;"><i>({{ $workNotComplete->name_de }})</i></p>
                </td>
                <td style="padding: 5px 10px; border-bottom: 0.5px solid #eaeaea; width: 130px; vertical-align: top;">
                    <p style="font-size: 8pt; color: #0c060e;">{{ Carbon\Carbon::parse($workNotComplete->time_from)->format('H:i') }}
                        - {{ Carbon\Carbon::parse($workNotComplete->time_to)->format('H:i') }}</p>
                </td>
                <td style="padding: 5px 10px; border-bottom: 0.5px solid #eaeaea; vertical-align: top;">
                    <p style="font-size: 8pt; color: #0c060e;">{{ $workNotComplete->value }}</p>
                </td>
            </tr>
        </table>
    </div>

    @php($count_p++)
@endforeach
<!--<pagebreak>-->
<table autosize="1" style="width: 100%;">
    <tr>
        <td>
            <div style="width: 100%;">
                <table style=" margin-top: 15px; width: 100%; border-spacing: 5px;">
                    <tr style="border-bottom: 0.5px solid #60c5a0; background-color: #fff;">
                        <td colspan="4" style="padding: 5px 5px; width: 100%; text-align: left;">
                            <p style="font-size: 10pt; color: #0c060e;"><b>Информация к концу смены / Informationen am
                                    Ende der Schicht</b></p>
                        </td>
                    </tr>
                </table>
            </div>


            <div style="width: 100%;">
                <table style="width: 100%; font-size: 7px; padding-bottom: 15px;">
                    <tr>
                        @php($i = 0)
                        @foreach ($data->params_all as $key => $param)

                            {{--                            @if ($param->param->type_id != 2)--}}
                            {{--                                @continue--}}
                            {{--                            @endif--}}

                            @php($i++)
                            <td style="border: 1px solid #5a5a5c; width: 90px; height: 35px; padding: 3px;">{{$param['name_ru']}}</td>
                            <td style="border: 1px solid #5a5a5c; width: 40px; height: 35px; text-align: center;">
                                @if (isset($param['value']))
                                    {{$param['value']}}
                                @endif
                            </td>
                            @if ($i%5 == 0)
                    </tr>

                    <tr>
                        @endif
                        @endforeach
                    </tr>
                </table>
            </div>


            <div style="width: 100%;">
                <table style="width: 100%; font-size: 10px;">
                    <tr>
                        <td colspan="2"
                            style="border-bottom: 0.5px solid #5a5a5c; width: 70px; text-align: center; font-size: 11px;">
                            <p><b>С горной породой</b></p>
                            <p><i>(Mit Rock)</i></p>
                        </td>
                        <td style="width: 40px;"></td>
                        <td colspan="2"
                            style="border-bottom: 0.5px solid #5a5a5c; width: 70px; text-align: center; font-size: 11px;">
                            <p><b>На горизонте в вагоне</b></p>
                            <p><i>(Horizont in der Kutsche)</i></p>
                        </td>
                        <td style="width: 100px;"></td>
                        <td style="border-bottom: 0px solid #5a5a5c; width: 200px; padding-left: 10px;">
                        </td>
                    </tr>
                    <tr>
                        <td style="border-bottom: 0px solid #5a5a5c; width: 70px; height: 30px; padding-left: 10px;">
                            <p><b>Выдано</b></p>
                            <p><i>(Ausgegeben)</i></p>
                        </td>
                        <td style="border-bottom: 0px solid #5a5a5c; width: 70px; height: 30px; padding-left: 10px;">
                            <p><b>Отгружено</b></p>
                            <p><i>(Ausgeliefert)</i></p>
                        </td>
                        <td style="width: 40px;"></td>
                        <td style="border-bottom: 0px solid #5a5a5c; width: 70px; height: 30px; padding-left: 10px;">
                            <p><b>С грузом</b></p>
                            <p><i>(Ladung)</i></p>
                        </td>
                        <td style="border-bottom: 0px solid #5a5a5c; width: 70px; height: 30px; padding-left: 10px;">
                            <p><b>Порож</b></p>
                            <p><i>(Leer)</i></p>
                        </td>
                        <td style="width: 100px;"></td>
                        <td style="border-bottom: 0px solid #5a5a5c; width: 200px; height: 30px; padding-left: 10px; font-size: 11px;">
                            <p><b>Горная порода в забое(вагоны)</b></p>
                            <p><i>(Stein im Gesicht (Autos))</i></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 0.5px solid #5a5a5c; width: 70px; height: 35px; padding: 3px; font-size: 15px; text-align: center; color: #5b3b3b;">
                            <b>@foreach ($data->params as $key => $param)
                                    @if ($param->param_id === 43)
                                        {{$param->value}}
                                    @endif
                                @endforeach</b></td>
                        <td style="border: 0.5px solid #5a5a5c; width: 70px; height: 35px; padding: 3px; font-size: 15px; text-align: center; color: #5b3b3b;">
                            <b>@foreach ($data->params as $key => $param)
                                    @if ($param->param_id === 44)
                                        {{$param->value}}
                                    @endif
                                @endforeach</b></td>
                        <td style="width: 40px;"></td>
                        <td style="border: 0.5px solid #5a5a5c; width: 70px; height: 35px; padding: 3px; font-size: 15px; text-align: center; color: #5b3b3b;">
                            <b>@foreach ($data->params as $key => $param)
                                    @if ($param->param_id === 45)
                                        {{$param->value}}
                                    @endif
                                @endforeach</b></td>
                        <td style="border: 0.5px solid #5a5a5c; width: 70px; height: 35px; padding: 3px; font-size: 15px; text-align: center; color: #5b3b3b;">
                            <b>@foreach ($data->params as $key => $param)
                                    @if ($param->param_id === 46)
                                        {{$param->value}}
                                    @endif
                                @endforeach</b></td>
                        <td style="width: 100px;"></td>
                        <td style="border: 0.5px solid #5a5a5c; width: 200px; height: 35px; padding: 3px; font-size: 15px; text-align: center; color: #5b3b3b;">
                            <b>@foreach ($data->params as $key => $param)
                                    @if ($param->param_id === 47)
                                        {{$param->value}}
                                    @endif
                                @endforeach</b></td>
                    </tr>

                    <tr>

                    </tr>
                </table>
            </div>

        </td>
    </tr>
</table>

<table autosize="1" style="width: 100%;">
    <tr>
        <td>
            <div style="width: 100%;">
                <table style=" margin-top: 15px; width: 100%; border-spacing: 5px;">
                    <tr style="border-bottom: 0.5px solid #60c5a0; background-color: #fff;">
                        <td colspan="4" style="padding: 5px 5px; width: 100%; text-align: left;">
                            <p style="font-size: 10pt; color: #0c060e;"><b>Подпись / Unterschrift</b></p>
                        </td>
                    </tr>
                </table>
            </div>


            <div>
                <table>
                    <tr>
                        <td>
                            <p style="font-size: 9px; width:100px;">Горный мастер</p>
                            <p style="font-size: 7px;"><i>(Bergbaumeister)</i></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 0.5px solid #5a5a5c; width: 300px; height: 90px; vertical-align: top; padding: 5px; font-size: 11px;">
                            <p>{{$data->user->first_name}} {{$data->user->sur_name}}</p>
                        </td>
                    </tr>
                </table>
            </div>
        </td>
    </tr>
</table>
