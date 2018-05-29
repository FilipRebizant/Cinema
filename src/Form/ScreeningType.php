<?php

namespace App\Form;

use App\Entity\Screening;

use Doctrine\DBAL\Types\DateType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type;

class ScreeningType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('start_date', Type\DateType::class, array(
                'widget' => 'single_text',
                'html5' => false,
                'attr' => ['class' => 'datetimepicker'],
                'label' => 'Godzina rozpoczęcia',
            ))
            ->add('price',null, array(
                'label' => 'Cena biletu',
                'attr' => array('class' => '')
            ))
            ->add('movies', null, array(
                'label' => 'Grany film',
            ))
            ->add('hall', null, array(
                'label' => 'Numer sali',
            ))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Screening::class,
        ]);
    }
}
